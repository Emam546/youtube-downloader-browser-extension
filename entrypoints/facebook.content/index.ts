import "@assets/tailwind.css";
import { mount } from "./inject";

export default defineContentScript({
  matches: ["*://*.facebook.com/*"],
  main() {
    const observer = new MutationObserver(() => {
      mount();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    mount();
    window.addEventListener("beforeunload", () => {
      observer.disconnect();
    });
  },
});
