import { MainSmallButton } from "@components/buttons/mainSmall";
import { createRoot } from "react-dom/client";

export function createButton(url: string | (() => string)) {
  const container = document.createElement("div");

  createRoot(container).render(
    <div className="top-3 right-3 absolute z-999999999999999 ">
      <MainSmallButton
        onClick={() => {
          if (!url) {
            console.log("No video URL found");
            return;
          }
          if (typeof url == "string") sendToDownloader(url);
          else sendToDownloader(url());
        }}
        className="w-12 p-3 border-none"
      />
    </div>,
  );
  return container;
}
