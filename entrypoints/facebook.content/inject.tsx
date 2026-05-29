import { MainSmallButton } from "@components/buttons/mainSmall";
import { createRoot } from "react-dom/client";

function findVideoId(url: string) {
  const match = url.match(/(?:\?|&)v=([0-9]{15,})/i);
  return match ? match[1] : null;
}

function findVideoLinkFromElement(el: Element): string {
  const links = el.querySelectorAll<HTMLAnchorElement>("a");
  for (const a of links) {
    const href = a.getAttribute("href");
    if (!href) continue;

    if (
      href.includes("/watch") ||
      href.includes("/reel/") ||
      href.includes("/videos/")
    ) {
      return href.startsWith("http") ? href : `https://www.facebook.com${href}`;
    }
  }

  return "";
}

export function mount() {
  const url = location.href;

  // skip some pages
  if (
    url.startsWith("https://www.facebook.com/watch/live/") ||
    url.startsWith("https://www.facebook.com/stories/")
  ) {
    return;
  }

  // =========================
  // WATCH VIDEO PAGE
  // =========================
  if (url.startsWith("https://www.facebook.com/watch")) {
    const videoId = findVideoId(url);
    if (videoId) {
      const container = document.querySelector<HTMLDivElement>(
        'div[id="watch_feed"]',
      );

      if (container) {
        const video = container.querySelector(
          "div[data-instancekey]:not([data-mark='1'])",
        );
        if (video) {
          const btn = createButton(url);
          video.appendChild(btn);
          video.setAttribute("data-mark", "1");
        }
      }
    }
  }

  // =========================
  // REELS PAGE
  // =========================
  if (url.includes("/reel/")) {
    const reel = document.querySelector('[data-video-id]:not([data-mark="1"])');
    if (reel) {
      const reelId = reel.getAttribute("data-video-id");
      if (reelId) {
        const fullUrl = `https://www.facebook.com/reel/${reelId}`;

        const btn = createButton(fullUrl);

        const parent = reel.parentElement;
        if (parent) {
          parent.appendChild(btn);
          reel.setAttribute("data-mark", "1");
        }
      }
    }
  }
  // =========================
  // HOME FEED
  // =========================
  document
    .querySelectorAll<HTMLElement>("div[data-instancekey]:not([data-mark='1'])")
    .forEach((post) => {
      const video = post.parentNode?.querySelector("video");
      if (!video) return;

      let link = findVideoLinkFromElement(post);

      if (!link) {
        const closestA = post.closest("a");
        if (closestA) {
          const href = closestA.getAttribute("href");
          if (href) {
            link = href.startsWith("http")
              ? href
              : `https://www.facebook.com${href}`;
          }
        }
      }
      if (!link) return;
      const btn = createButton(link);

      post.appendChild(btn);
      post.setAttribute("data-mark", "1");
    });
}

function createButton(url: string) {
  const container = document.createElement("div");

  createRoot(container).render(
    <div className="top-3 right-3 absolute z-999999999999999 ">
      <MainSmallButton
        onClick={() => {
          if (!url) {
            console.log("No video URL found");
            return;
          }
          sendToDownloader(url);
        }}
        className="w-12 p-3 border-none"
      />
    </div>,
  );
  return container;
}
