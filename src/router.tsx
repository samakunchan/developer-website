import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { getQueryClient } from './queryClient';

export function getRouter() {
  const queryClient = getQueryClient();

  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    context: {
      queryClient,
    },
  });

  return router;
}
