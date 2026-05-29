import _getVideoId from "get-youtube-id";

export function isValidURL(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}
export function getYoutubeUrlFromAnchor(thumb: Element): string | null {
  const anchor = thumb.querySelector("a");
  if (!anchor) return null;
  const href = anchor.getAttribute("href");
  if (!href) return null;
  const url = `https://www.youtube.com${href}`;
  if (!isValidURL(url)) {
    if (isValidURL(href)) return href;
    return null;
  }
  return url;
}
