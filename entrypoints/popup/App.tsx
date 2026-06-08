import { useEffect, useState } from "react";
import { LogoIcon } from "@/components/icon";
interface Settings {
  defaultBehavior: "app" | "website";
  websiteUrl: string;
}

export default function App() {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [settings, setSettings] = useState<Settings>({
    defaultBehavior: "app",
    websiteUrl: "https://youtube-playlists.onrender.com/",
  });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Get current tab URL
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs[0]?.url) {
        setCurrentUrl(tabs[0].url);
      }
    });

    // Load settings from storage
    browser.storage.local
      .get(["defaultBehavior", "websiteUrl"])
      .then((result) => {
        setSettings({
          defaultBehavior:
            (result.defaultBehavior as "app" | "website") || "app",
          websiteUrl:
            (result.websiteUrl as string) ||
            "https://youtube-playlists.onrender.com/",
        });
      });
  }, []);

  const handleDownload = (behavior: "app" | "website") => {
    if (!currentUrl) return;

    if (behavior === "app") {
      const encodedUrl = encodeURIComponent(`link="${currentUrl}"`);
      const deepLink = `youtube-downloader://${encodedUrl}`;
      browser.tabs.create({ url: deepLink });
    } else {
      const encodedUrl = encodeURIComponent(currentUrl);
      const downloadUrl = `${settings.websiteUrl}?url=${encodedUrl}`;
      browser.tabs.create({ url: downloadUrl });
    }
    window.close();
  };

  const handleQuickDownload = () => {
    handleDownload(settings.defaultBehavior);
  };

  const saveSettings = () => {
    browser.storage.local.set({
      defaultBehavior: settings.defaultBehavior,
      websiteUrl: settings.websiteUrl,
    });
    setShowSettings(false);
  };
  return (
    <div style={{ width: "500px" }} className="w-80 p-4 bg-white">
      {!showSettings ? (
        <>
          <div className="flex items-center">
            <div className="w-10 mr-1">
              <LogoIcon className="w-full" />
            </div>
            <h1 className="text-lg font-bold mb-4">YouTube Downloader</h1>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Current URL: {currentUrl.slice(0, 50)}...
          </p>

          <div className="space-y-2 mb-4">
            <button
              onClick={() => {
                browser.tabs.create({
                  url: "https://github.com/Emam546/youtube-downloader/releases/latest",
                });
              }}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Download Desktop App
            </button>

            <button
              onClick={() => handleDownload("app")}
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Open in App
            </button>

            <button
              onClick={() => handleDownload("website")}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
            >
              Open in Website
            </button>
          </div>

          <button
            onClick={() => setShowSettings(true)}
            className="w-full text-gray-600 py-2 px-4 rounded hover:bg-gray-100"
          >
            Settings
          </button>
        </>
      ) : (
        <>
          <h1 className="text-lg font-bold mb-4">Settings</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Default Behavior
              </label>
              <select
                value={settings.defaultBehavior}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultBehavior: e.target.value as "app" | "website",
                  })
                }
                className="w-full p-2 border rounded"
              >
                <option value="app">App</option>
                <option value="website">Website</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Website URL
              </label>
              <input
                type="text"
                value={settings.websiteUrl}
                onChange={(e) =>
                  setSettings({ ...settings, websiteUrl: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="https://example.com"
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={saveSettings}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
