export function sendToDownloader(url: string): void {
  browser.runtime.sendMessage({ type: "download-video", payload: { url } });
}
