import path from 'node:path';

import { partytownVite } from '@builder.io/partytown/utils';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

import _config from './_config';

const HOST = _config.server.host
const PORT = _config.server.port

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: HOST,
    port: PORT
  },
  plugins: [
    react(),
    partytownVite({
      dest: path.join(__dirname, 'dist', '~partytown')
    })
  ]
});
