import { defineConfig } from 'vite';
import { nitro } from 'nitro/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react-swc';
import { lingui } from '@lingui/vite-plugin';
import { imagetools } from 'vite-imagetools';
import fs from 'node:fs';
import path from 'node:path';

// Middleware to serve files from public/shared/projects via /cdn/ in dev mode
function cdnDevProxy() {
  return {
    name: 'vite-plugin-cdn-dev-proxy',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/cdn/')) {
          // Parse URL to exclude query parameters
          const urlPath = req.url.split('?')[0];
          const relativePath = urlPath.replace('/cdn/', '');
          let filePath: string;

          if (relativePath.startsWith('temp/')) {
            filePath = path.join(process.cwd(), 'public', 'shared', 'temp', relativePath.replace('temp/', ''));
          } else {
            const parts = relativePath.split('/');
            if (parts.length > 1) {
              const folder = parts[0];
              const filename = parts.slice(1).join('/');
              filePath = path.join(process.cwd(), 'public', 'shared', folder, filename);
            } else {
              // Fallback for old URLs without folder
              filePath = path.join(process.cwd(), 'public', 'shared', 'projects', relativePath);
            }
          }

          if (fs.existsSync(filePath)) {
            const ext = path.extname(filePath).toLowerCase();
            let contentType = 'application/octet-stream';
            if (ext === '.webp') contentType = 'image/webp';
            else if (ext === '.png') contentType = 'image/png';
            else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';

            res.setHeader('Content-Type', contentType);
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

            const stream = fs.createReadStream(filePath);
            stream.pipe(res);
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart(),
    nitro(),
    cdnDevProxy(),
    // react's vite plugin must come after start's vite plugin
    viteReact({ plugins: [['@lingui/swc-plugin', {}]] }),
    lingui(),
    imagetools(),
  ],
});
