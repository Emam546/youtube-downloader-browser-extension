import { LogoIcon } from "@components/icon";
import { sendToDownloader } from "@utils/index";
import { createRoot } from "react-dom/client";
import { youtubeThumbnail } from "../shared";

export function mountYoutubeWatchButton(): void {
  if (!isYoutubeWatchPage()) return;
  const actions = document.querySelectorAll("ytd-watch-metadata");
  actions.forEach((con) => {
    if (con.querySelector(`.${youtubeThumbnail}`)) return;
    const actionBar = con.querySelector("ytd-menu-renderer")!;
    actionBar.querySelector("ytd-download-button-renderer")?.remove();
    if (!actionBar) return;
    let container = document.createElement("div");
    container.className = youtubeThumbnail;
    actionBar.insertBefore(container, actionBar.children[1]);
    createRoot(container).render(
      <div className="pl-10">
        <button
          id="yt-downloader-extension-button"
          type="button"
          className="inline-flex items-center gap-2 bg-primary text-white text-xl font-bold p-2.5 rounded-3xl cursor-pointer"
          aria-label="Download this video with the app"
          onClick={() => sendToDownloader(window.location.href)}
        >
          <LogoIcon alt="Downloader App" className="w-10" />
          <span className="label">Download</span>
        </button>
      </div>,
    );
  });
}
function isYoutubeWatchPage(): boolean {
  return /^\/watch\?/.test(window.location.pathname + window.location.search);
}
