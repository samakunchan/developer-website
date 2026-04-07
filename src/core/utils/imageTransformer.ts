import type { Operations } from 'unpic';

export function myCustomApiTransformer(url: string | URL, operations: Operations): string {
  const params = new URLSearchParams({
    // Original image URL
    url: url.toString(),

    // Pass width if requested by the sizes
    ...(operations.width && { w: operations.width.toString() }),

    // Force format
    f: 'webp',
  });

  return `/api/optimize-image?${params.toString()}`;
}
