import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      open: true,
      port: parseInt(env.VITE_SERVER_PORT),
      proxy: {
        '/api': {
          target: env.VITE_SERVER_URL,
        },
      },
    },
    resolve: {
      alias: {
        '#': '/src',
        '#components': '/src/components',
        '#helpers': '/src/helpers',
        '#hooks': '/src/hooks',
        '#pages': '/src/pages',
        '#services': '/src/services',
        '#types': '/src/types',
      },
    },
  }
})
