import { defineConfig, type Plugin } from 'vitest/config';
import react from '@vitejs/plugin-react';

/**
 * En développement et en prévisualisation, les fonctions Vercel ne sont pas
 * exécutées. Ce middleware renvoie volontairement un 503 JSON explicite pour
 * que l'interface n'affiche jamais de faux succès et n'essaie pas de parser
 * une page 404 HTML.
 */
function localApiNotice(): Plugin {
  const middleware = (
    req: { method?: string; url?: string },
    res: { statusCode: number; setHeader: (key: string, value: string) => void; end: (body: string) => void },
    next: () => void,
  ) => {
    const url = req.url ?? '';
    if (!url.startsWith('/api/')) {
      next();
      return;
    }
    const isNewsletter = url.startsWith('/api/newsletter');
    const isStripe = url.startsWith('/api/stripe/');
    if (!isNewsletter && !isStripe) {
      next();
      return;
    }
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.end(
      JSON.stringify(
        isStripe
          ? { error: 'Les paiements ne sont pas ouverts.', code: 'PAYMENTS_DISABLED' }
          : {
              error:
                'Le service d’inscription n’est pas actif sur cette version locale. Il s’active après configuration de Resend et déploiement sur Vercel (voir le README).',
              code: 'SERVICE_NOT_CONFIGURED',
            },
      ),
    );
  };
  return {
    name: 'astralis-local-api-notice',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig({
  plugins: [react(), localApiNotice()],
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
  },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          'astro-engine': ['astronomy-engine'],
          router: ['react-router-dom'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'html'],
      include: ['src/lib/**/*.ts'],
    },
  },
});
