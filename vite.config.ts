import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [],
      manifest: {
        name: "Komputer Shop",
        short_name: "Shop",
        description: "E-commerce app",
        theme_color: "#0b74de",
        background_color: "#ffffff",
        start_url: "/",
        display: "standalone",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html}"],
        navigateFallback: "/offline.html",
        runtimeCaching: [
          {
            urlPattern: /\/api\/.*$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 },
              networkTimeoutSeconds: 10,
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
