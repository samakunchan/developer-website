import { createFileRoute } from '@tanstack/react-router';
import sharp from 'sharp';

export const Route = createFileRoute('/api/optimize-image')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const imageUrl = url.searchParams.get('url');
        const width = url.searchParams.get('w');
        const format = url.searchParams.get('f') || 'webp';

        if (!imageUrl) {
          return new Response('Missing target URL', { status: 400 });
        }

        try {
          const response = await fetch(imageUrl);
          if (!response.ok) {
            return new Response('Failed to fetch image', {
              status: response.status,
            });
          }

          const arrayBuffer = await response.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          let sharpInstance = sharp(buffer);

          if (width) {
            const parsedWidth = parseInt(width, 10);
            if (!isNaN(parsedWidth)) {
              sharpInstance = sharpInstance.resize({
                width: parsedWidth,
                withoutEnlargement: true,
              });
            }
          }

          if (format === 'webp') {
            sharpInstance = sharpInstance.webp({ quality: 80 });
          } else if (format === 'avif') {
            sharpInstance = sharpInstance.avif({ quality: 80 });
          } else if (format === 'png') {
            sharpInstance = sharpInstance.png();
          } else if (format === 'jpeg' || format === 'jpg') {
            sharpInstance = sharpInstance.jpeg({ quality: 80 });
          }

          const optimizedBuffer = await sharpInstance.toBuffer();

          return new Response(new Uint8Array(optimizedBuffer), {
            status: 200,
            headers: {
              'Content-Type': `image/${format === 'jpg' ? 'jpeg' : format}`,
              'Cache-Control': 'public, max-age=31536000, immutable',
            },
          });
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          return new Response('Internal Server Error validating Image content', { status: 500 });
        }
      },
    },
  },
});
