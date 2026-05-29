interface Message {
  type: string;
  payload: any;
}
interface VideoDownload extends Message {
  type: "download-video";
  payload: {
    url: string;
  };
}

export default defineBackground(() => {
  function openDownloaderForUrl(rawUrl: string) {
    if (!rawUrl) return;
    const encodedUrl = encodeURIComponent(`link="${rawUrl}"`);
    const deepLink = `youtube-downloader://${encodedUrl}`;
    browser.tabs.create({ url: deepLink });
  }
  browser.runtime.onMessage.addListener((msg: Message) => {
    switch (msg.type) {
      case "download-video":
        openDownloaderForUrl(msg.payload.url);
    }
  });
});
