import { defineConfig } from 'vitest/config';

// Test-only config. Deliberately does not reuse vite.config.js so the PWA
// plugin and dev-server settings stay out of the test runtime.
export default defineConfig({
    esbuild: {
        jsx: 'automatic',
    },
    test: {
        environment: 'node',
        include: ['src/**/*.test.{js,jsx}'],
    },
});
