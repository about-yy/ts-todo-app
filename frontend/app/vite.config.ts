import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import esLintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		vue(),
    esLintPlugin({
      cache: false, // 必須。キャッシュを無効にする
      include: ['./src/**/*.vue', './src/**/*.ts'], // ESLintを実行するファイルのパス
      exclude: [], // ESLintを実行しないファイルのパス
    })
	],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/index.scss";`,
      },
    }
  },
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
    port: parseInt(process.env.PORT)
  }
})
