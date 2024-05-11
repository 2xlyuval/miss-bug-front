import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //if the backend is in the same project so the build should be in the backend public folder
  // build: {
  //   outDir: '..backend/public',
  //   emptyOutDir: true,
  // },
})
