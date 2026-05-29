import { LogoIcon } from "@components/icon";
import { sendToDownloader } from "@utils/index";
import { createRoot } from "react-dom/client";
import { getYoutubeUrlFromAnchor, isValidURL } from "../utils";
import classNames from "classnames";
import { youtubeThumbnail } from "../shared";
import { MainSmallButton } from "@components/buttons/mainSmall";

export function mountYoutubeThumbnailButtons(): void {
  RichThumbnail();
  lockUpView();
}
function RichThumbnail() {
  document
    .querySelectorAll<HTMLAnchorElement>("ytd-rich-item-renderer")
    .forEach((thumb) => {
      if (thumb.querySelector(`.${youtubeThumbnail}`)) return;
      const videoURl = getYoutubeUrlFromAnchor(thumb);
      if (!videoURl) return;
      if (window.getComputedStyle(thumb).position === "static")
        thumb.style.position = "relative";

      const container = document.createElement("div");
      container.className = youtubeThumbnail;
      thumb.appendChild(container);

      createRoot(container).render(
        <MainSmallButton
          className={classNames("absolute top-[3%] right-[3%] p-3 w-15 z-3")}
          onClick={(event) => {
            sendToDownloader(videoURl);
          }}
        />,
      );
    });
}
function lockUpView() {
  document
    .querySelectorAll<HTMLAnchorElement>(
      "yt-lockup-view-model ,ytd-grid-video-renderer ,ytm-shorts-lockup-view-model",
    )
    .forEach((thumb) => {
      if (thumb.closest(`ytd-rich-item-renderer`)) return;
      if (thumb.querySelector(`.${youtubeThumbnail}`)) return;
      const videoURl = getYoutubeUrlFromAnchor(thumb);
      if (!videoURl) return;
      if (window.getComputedStyle(thumb).position === "static")
        thumb.style.position = "relative";

      const container = document.createElement("div");
      container.className = youtubeThumbnail;
      thumb
        .querySelector("yt-thumbnail-view-model ,yt-image")
        ?.appendChild(container);

      createRoot(container).render(
        <MainSmallButton
          className={classNames("absolute top-[5%] right-[3%] p-3 w-15")}
          onClick={(event) => {
            sendToDownloader(videoURl);
          }}
        />,
      );
    });
}
