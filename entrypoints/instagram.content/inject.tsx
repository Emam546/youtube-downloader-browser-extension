import { MainSmallButton } from "@components/buttons/mainSmall";
import { createRoot } from "react-dom/client";

function findVideoLinkFromElement(el: Element): string {
  const reel = el.querySelector(
    '[aria-label="Video player"]:not([data-mark="1"])',
  );
  const a = reel?.closest("a");
  if (!a) return "";
  const href = a.getAttribute("href");
  if (!href) return "";
  if (
    href.includes("/watch") ||
    href.includes("/reels/") ||
    href.includes("/videos/")
  ) {
    return href.startsWith("http") ? href : `https://www.instagram.com${href}`;
  }

  return "";
}

export function mount() {
  const url = location.href;

  if (url.includes("/reels/")) {
    const reel = document.querySelector(
      '[aria-label="Video player"]:not([data-mark="1"])',
    );
    if (reel) {
      const btn = createButton(() => location.href);
      const parent = reel.parentElement;
      if (parent) {
        parent.appendChild(btn);
        reel.setAttribute("data-mark", "1");
      }
    }
  }
  document
    .querySelectorAll("article:not([data-post='1'])")
    .forEach((article) => {
      const link = findVideoLinkFromElement(article);
      if (link) {
        const section = article.querySelector("section");
        const container = document.createElement("div");
        const parent = section?.children[1] as HTMLDivElement;
        parent.style.display = "flex";
        parent.style.gap = "5px";
        parent.style.alignItems = "center";
        createRoot(container).render(
          <div className="">
            <MainSmallButton
              onClick={() => {
                if (!url) {
                  console.log("No video URL found");
                  return;
                }

                sendToDownloader(link);
              }}
              className="w-7 p-1.5 border-none"
            />
          </div>,
        );
        parent.insertBefore(container, parent.children[0]);
        article.setAttribute("data-post", "1");
        console.log("Instagram Post:", link);
      }
    });
}
