import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  environments: {
    ssr: {
      build: {
        rolldownOptions: {
          input: "./server/app.ts",
        },
      },
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [reactRouter()],
});
