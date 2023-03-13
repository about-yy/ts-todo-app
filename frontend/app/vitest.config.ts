import { defineConfig } from "vitest/config";
import Vue from "@vitejs/plugin-vue";
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    Vue(),
    vuetify({ autoImport: true })

  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/index.scss";`,
      },
    }
  },
  test: {
    globals: true,
    setupFiles: "./test/setup.ts",
    deps: {
      inline: ['vuetify']
    },
    environment: "jsdom",
  },
});