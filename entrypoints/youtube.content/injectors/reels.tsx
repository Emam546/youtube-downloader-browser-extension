import { LogoIcon } from "@components/icon";
import { sendToDownloader } from "@utils/index";
import { createRoot } from "react-dom/client";
import _getVideoId from "get-youtube-id";
import { youtubeThumbnail } from "../shared";
import { MainSmallButton } from "@components/buttons/mainSmall";

export function mountYoutubeShorts(): void {
  const thumbs = document.querySelectorAll<HTMLDivElement>(
    "ytd-reel-video-renderer",
  );
  thumbs.forEach((thumb) => {
    if (thumb.querySelector(`.${youtubeThumbnail}`)) return;
    const container = document.createElement("div");
    container.className = youtubeThumbnail;
    container.style.marginTop = "0px";
    const buttonsContainer = thumb.querySelector("reel-action-bar-view-model");
    buttonsContainer?.insertBefore(container, buttonsContainer.children[2]);
    createRoot(container).render(
      <MainSmallButton
        className={"p-3 w-18 mb-4"}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          const videoUrl = window.location.href;

          sendToDownloader(videoUrl);
        }}
      />,
    );
  });
}
