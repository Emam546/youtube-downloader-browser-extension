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
  async function openDownloaderForUrl(
    rawUrl: string,
    behavior?: "app" | "website",
    websiteUrl?: string,
  ) {
    const settings = await browser.storage.local.get([
      "defaultBehavior",
      "websiteUrl",
    ]);
    behavior =
      behavior ?? (settings.defaultBehavior as "app" | "website") ?? "app";

    websiteUrl = websiteUrl ?? (settings.websiteUrl as string) ?? "";
    console.log(settings, behavior);
    if (behavior === "website") {
      const encodedUrl = encodeURIComponent(rawUrl);
      const downloadUrl = `${websiteUrl || "https://youtube-playlists.onrender.com/"}?referredLink=${encodedUrl}`;
      browser.tabs.create({ url: downloadUrl });
    } else {
      const encodedUrl = encodeURIComponent(`link="${rawUrl}"`);
      const deepLink = `youtube-downloader://${encodedUrl}`;
      browser.tabs.create({ url: deepLink });
    }
  }

  browser.runtime.onMessage.addListener((msg: Message) => {
    switch (msg.type) {
      case "download-video":
        openDownloaderForUrl(
          msg.payload.url,
          msg.payload.behavior,
          msg.payload.websiteUrl,
        );
    }
  });
});
