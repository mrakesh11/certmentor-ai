import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['aws-logo.svg', 'dumpbits.pdf'],
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
  server: {
    host: true, // Listens on all local IPs, necessary for port forwarding
    port: 5173,
    strictPort: true, // Prevents Vite from auto-incrementing the port
    allowedHosts: true, // Allows public tunneling services like localtunnel
  }
})
