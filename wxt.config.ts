import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
      "name": "Video Downloader Bridge",
  "description": "Send the current video/page URL to the downloader app",
    icons: {
      128: "/icon/icon.png",
    },
  },
  vite: () => ({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    plugins: [tailwindcss()],
  }),
});
