import { QueryClient } from '@tanstack/react-query';

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });
}

// For client-side only, we can have a singleton
let clientQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (typeof window === 'undefined') {
    return createQueryClient();
  }
  if (!clientQueryClient) {
    clientQueryClient = createQueryClient();
  }
  return clientQueryClient;
}
