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
    WHERE embedding IS NOT NULL
      AND (
        1 - (embedding <=> ${vectorString}::vector) > 0.3
        OR content ILIKE ${'%' + query + '%'}
        OR category ILIKE ${'%' + query + '%'}
      )
    ORDER BY 
      (content ILIKE ${'%' + query + '%'} OR category ILIKE ${'%' + query + '%'}) DESC,
      embedding <=> ${vectorString}::vector
    LIMIT 10;
  `;

  return results;
}
