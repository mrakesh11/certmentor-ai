import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['aws-logo.svg', 'Practice_Questions.pdf'],
      manifest: {
        name: 'AWS CLF-C02 Platinum Simulator',
        short_name: 'AWS Simulator',
        description: 'Ultimate Practice Exam & Cheatsheets for AWS Certified Cloud Practitioner',
        theme_color: '#1e1e2f',
        background_color: '#12121e',
        icons: [
          {
            src: 'aws-logo.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
            }
            if (id.includes('canvas-confetti')) {
              return 'vendor-confetti';
            }
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            return 'vendor';
          }
          if (id.includes('learning-manifest.json')) {
            return 'data-manifest';
          }
          if (id.includes('questions.normalized.json') || id.includes('questionsData.js') || id.includes('questions.enriched.json')) {
            return 'data-questions';
          }
        }
      }
    }
  },
  server: {
    host: true, // Listens on all local IPs, necessary for port forwarding
    port: 5173,
    strictPort: true, // Prevents Vite from auto-incrementing the port
    allowedHosts: true, // Allows public tunneling services like localtunnel
  }
})
