import { sendToDownloader } from "@utils/index";
import { createRoot } from "react-dom/client";
import { youtubeThumbnail } from "../shared";
import { MainSmallButton } from "@components/buttons/mainSmall";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "yt-icon": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "yt-share-target-renderer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export function mountYoutubeShareButton(): void {
  const shareContainer = document.querySelector(
    "yt-unified-share-panel-renderer",
  );
  if (!shareContainer || shareContainer.querySelector(`.${youtubeThumbnail}`))
    return;
  const contents = shareContainer?.querySelector(
    "yt-third-party-share-target-section-renderer #contents",
  )!;
  console.log("shared");
  let container = document.createElement("yt-share-target-renderer");
  container.className = `${youtubeThumbnail} style-scope yt-third-party-share-target-section-renderer`;
  contents.insertBefore(container, contents.children[0]);
  createRoot(container).render(
    <div id="target" className="style-scope yt-share-target-renderer">
      <div className="ytIconWrapperHost yt-share-target-renderer">
        <MainSmallButton
          className="w-full p-5"
          onClick={() => {
            const link = shareContainer.querySelector<HTMLInputElement>(
              "yt-copy-link-renderer input",
            )?.value;
            if (link) sendToDownloader(link);
          }}
        />
      </div>
      <p className="style-scope yt-share-target-renderer" style-target="title">
        Download
      </p>
    </div>,
  );
}
