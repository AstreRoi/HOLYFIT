import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 현재 모드(development/production)에 맞는 .env 파일을 로드합니다.
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // 코드 내의 process.env.API_KEY를 실제 값으로 치환합니다.
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY),
    },
  };
})