import { defineConfig } from 'vite';
import { nitro } from 'nitro/vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react-swc';
import { lingui } from '@lingui/vite-plugin';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
    nitro(),
    // react's vite plugin must come after start's vite plugin
    viteReact({ plugins: [['@lingui/swc-plugin', {}]] }),
    lingui(),
    imagetools(),
  ],
});
