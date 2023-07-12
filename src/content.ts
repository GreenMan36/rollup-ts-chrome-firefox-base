import browser from "webextension-polyfill";
import urls from "./urls";
import { incrementStat } from "./stats";

let redirectGoogleFonts = false;

browser.storage.sync.get("redirectGoogleFonts").then((data) => {
  redirectGoogleFonts = data.redirectGoogleFonts;
});

browser.storage.onChanged.addListener(
  (changes: { [key: string]: browser.Storage.StorageChange }) => {
    if (changes.redirectGoogleFonts) {
      redirectGoogleFonts = changes.redirectGoogleFonts.newValue;
      console.log("redirectGoogleFonts: ", redirectGoogleFonts ? "on" : "off");
    }
  }
);

document.addEventListener("DOMContentLoaded", function () {
  const observer = new MutationObserver((mutations: MutationRecord[]) => {
    urls.forEach(({ source, destination }) => {
      mutations.forEach((mutation: MutationRecord) => {
        if (mutation.type === "childList" && redirectGoogleFonts) {
          const elements = document.querySelectorAll<HTMLLinkElement>(
            `link[rel="stylesheet"][href*="${source}"]`
          );
          elements.forEach((element: HTMLLinkElement) => {
            let originalURL = element.href;
            element.disabled = true;
            element.href = originalURL.replace(source, destination);
            console.log("Replaced: ", originalURL, " with ", element.href);
            element.addEventListener("load", () => {
              element.disabled = false;
            });
            incrementStat("count-replaced");
          });
        }
      });
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
});
