import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  envPrefix: "HERPLAN_",
  // server: {
  //   host: "192.168.1.198",
  //   port: 8100,
  // },
});
