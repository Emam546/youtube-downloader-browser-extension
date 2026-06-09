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
    <div className="w-90 bg-slate-50  shadow-lg border border-slate-200 overflow-hidden m-0 p-0">
      {!showSettings ? (
        <>
          {/* Header */}
          <div className="p-5 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-red-50 rounded-xl">
                <LogoIcon className="w-10" />
              </div>

              <div>
                <h1 className="font-bold text-slate-900 m-0">YouTube Downloader</h1>
                <p className="text-xs text-slate-500 m-0">
                  Download videos instantly
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="bg-white rounded-xl border border-slate-200 p-3 mb-4">
              <p className="text-xs font-medium text-slate-500 mb-1">
                Current URL
              </p>

              <p className="text-sm text-slate-700 break-all">
                {currentUrl.slice(0, 60)}...
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() =>
                  browser.tabs.create({
                    url: "https://github.com/Emam546/youtube-downloader/releases/latest",
                  })
                }
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white font-medium hover:bg-black transition-all"
              >
                Download Desktop App
              </button>

              <button
                onClick={() => handleDownload("app")}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-all"
              >
                Open in App
              </button>

              <button
                onClick={() => handleDownload("website")}
                className="w-full py-2.5 px-4 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-all"
              >
                Open in Website
              </button>
            </div>

            <button
              onClick={() => setShowSettings(true)}
              className="mt-4 w-full py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition-all"
            >
              Settings
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Settings Header */}
          <div className="p-5 border-b border-slate-200">
            <h1 className="font-bold text-slate-900 text-lg">Settings</h1>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
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
                className="w-full p-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="app">App</option>
                <option value="website">Website</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Website URL
              </label>

              <input
                type="text"
                value={settings.websiteUrl}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    websiteUrl: e.target.value,
                  })
                }
                placeholder="https://example.com"
                className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={saveSettings}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all"
              >
                Save
              </button>

              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition-all"
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
