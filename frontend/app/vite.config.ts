/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import esLintPlugin from "vite-plugin-eslint";
import { VitePluginFonts } from "vite-plugin-fonts";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    esLintPlugin({
      cache: false, // 必須。キャッシュを無効にする
      include: ["./src/**/*.vue", "./src/**/*.ts"], // ESLintを実行するファイルのパス
      exclude: [], // ESLintを実行しないファイルのパス
    }),
    VitePluginFonts({
      google: {
        families: ["Noto Sans JP"],
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/index.scss";`,
      },
    },
  },
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
    port: parseInt(process.env.PORT),
  },
  test: {
    globals: true,
    setupFiles: "./test/setup.ts",
    environment: "jsdom",
  },
});
