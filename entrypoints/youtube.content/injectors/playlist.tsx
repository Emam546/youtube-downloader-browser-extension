import { LogoIcon } from "@components/icon";
import { sendToDownloader } from "@utils/index";
import { createRoot } from "react-dom/client";
import { getYoutubeUrlFromAnchor, isValidURL } from "../utils";
import { MainSmallButton } from "@components/buttons/mainSmall";
import { youtubeThumbnail } from "../shared";

export function mountPlaylistPanelViewer(): void {
  const actions = document.querySelectorAll(
    "ytd-playlist-panel-video-renderer ,ytd-playlist-video-renderer ,yt-lockup-view-model",
  );
  actions.forEach((con) => {
    if (con.querySelector(`.${youtubeThumbnail}`)) return;
    const url = getYoutubeUrlFromAnchor(con);
    if (!url) return;
    const actionBar = con.querySelector("ytd-menu-renderer")!;
    if (!actionBar) return;
    let container = document.createElement("div");
    container.className = youtubeThumbnail;
    actionBar.insertBefore(container, actionBar.children[1]);
    createRoot(container).render(
      <div className="pl-10">
        <MainSmallButton className="p-3" onClick={() => sendToDownloader(url)} />
      </div>,
    );
  });
}
