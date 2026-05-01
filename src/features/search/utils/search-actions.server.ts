import { db } from '../../database/server/db.server';
import { generateEmbedding } from './embeddings.server';

/**
 * Server function to sync any pending embeddings where embedding is null.
 * This should be called by a cron job, or optionally hooked up to the dashboard.
 */
export async function syncPendingEmbeddingsInternal() {
  // Find up to 10 records without embeddings
  const pendingIndices = await db.$queryRaw<
    Array<{ id: number; content: string }>
  >`SELECT id, content FROM global_search_indices WHERE embedding IS NULL LIMIT 10`;

  if (pendingIndices.length === 0) {
    return { status: 'ok', message: 'No pending embeddings to sync.' };
  }

  let synced = 0;
  for (const item of pendingIndices) {
    try {
      // Generate vector locally
      const embedding = await generateEmbedding(item.content);
      const vectorString = `[${embedding.join(',')}]`;

      await db.$executeRaw`
        UPDATE global_search_indices
        SET embedding = ${vectorString}::vector, "updatedAt" = CURRENT_TIMESTAMP
        WHERE id = ${item.id}
      `;
      synced++;
    } catch (e) {
      console.error(`Failed to sync embedding for item ${item.id}`, e);
    }
  }

  return { status: 'ok', message: `Synced ${synced} embeddings.` };
}

export async function searchGlobalInternal(query: string) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  // Generate local embedding for search query
  const queryEmbedding = await generateEmbedding(query);
  const vectorString = `[${queryEmbedding.join(',')}]`;

  // Execute pgvector similarity search
  const results = await db.$queryRaw<
    Array<{
      id: number;
      itemId: number;
      itemType: string;
      category: string | null;
      content: string;
      similarity: number;
    }>
  >`
    SELECT id, "itemId", "itemType", category, content, 
           1 - (embedding <=> ${vectorString}::vector) as similarity
    FROM global_search_indices
    WHERE 
        1 - (embedding <=> ${vectorString}::vector) > 0.3
        OR content ILIKE ${'%' + query + '%'}
        OR category ILIKE ${'%' + query + '%'}
    ORDER BY 
      (content ILIKE ${'%' + query + '%'} OR category ILIKE ${'%' + query + '%'}) DESC,
      embedding <=> ${vectorString}::vector ASC NULLS LAST
    LIMIT 10;
  `;

  return results;
}

/**
 * Generic function to update or create a search index record.
 * Sets embedding to null so it can be synced later.
 */
export async function upsertSearchIndexInternal(itemId: number, itemType: string, content: string, category?: string) {
  // Use raw SQL because 'embedding' is an Unsupported type (vector) in Prisma
  // and we need to set it to NULL on update to trigger a re-sync.
  return await db.$executeRaw`
    INSERT INTO global_search_indices ("itemId", "itemType", content, category, "createdAt", "updatedAt")
    VALUES (${itemId}, ${itemType}, ${content}, ${category}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT ("itemId", "itemType") DO UPDATE SET
      content = EXCLUDED.content,
      category = EXCLUDED.category,
      embedding = NULL,
      "updatedAt" = CURRENT_TIMESTAMP
  `;
}

/**
 * Removes a search index record.
 */
export async function removeFromSearchIndexInternal(itemId: number, itemType: string) {
  return await db.globalSearchIndex.deleteMany({
    where: {
      itemId,
      itemType,
    },
  });
}

