import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    // 'base' is typically '/' for Vercel/Netlify (root domain). 
    // Only use './' if deploying to a sub-folder (like GitHub Pages).
    // For Vercel ease of use, we will default to '/' but keep logic flexible if needed.
    base: '/', 
    define: {
      // Expose VITE_API_KEY as process.env.API_KEY for compatibility with existing code
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY),
    },
  };
})