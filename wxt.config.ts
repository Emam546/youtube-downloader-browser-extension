import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import packageJson from "./package.json";
// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  zip: {
    artifactTemplate: "youtube-downloader-v{{version}}-{{browser}}.zip",
  },
  manifest: {
    version: packageJson.version,

    name: "Youtube Downloader",
    description: "Send the current video/page URL to the downloader app",
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
