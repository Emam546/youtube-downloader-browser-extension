import "@assets/tailwind.css";
import { mountYoutubeWatchButton } from "./injectors/DownloadWatch";
import { mountYoutubeThumbnailButtons } from "./injectors/thumbnails";
import { mountYoutubeShorts } from "./injectors/reels";
import { mountPlaylistPanelViewer } from "./injectors/playlist";
export default defineContentScript({
  matches: ["*://*.youtube.com/*"],
  main() {
    const inject = () => {
      mountYoutubeWatchButton();
      mountPlaylistPanelViewer();
      mountYoutubeThumbnailButtons();
      mountYoutubeShorts();
    };

    // Initial injection
    inject();

    // Observe YouTube dynamic page changes
    const observer = new MutationObserver(() => {
      inject();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup on unload
    window.addEventListener("beforeunload", () => {
      observer.disconnect();
    });
  },
});
