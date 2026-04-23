import { createServerFn } from '@tanstack/react-start';
import { searchGlobalInternal, syncPendingEmbeddingsInternal } from './search-actions.server';

export const syncPendingEmbeddings = createServerFn({ method: 'POST' }).handler(async () => {
  return await syncPendingEmbeddingsInternal();
});

export const searchGlobal = createServerFn({ method: 'GET' })
  .inputValidator((query: string) => query)
  .handler(async ({ data: query }) => {
    return await searchGlobalInternal(query);
  });
