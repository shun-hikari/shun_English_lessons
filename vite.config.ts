import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // ★ リポジトリ名に合わせる（末尾スラッシュ必須）
  base: '/shun_English_lessons/',
})
