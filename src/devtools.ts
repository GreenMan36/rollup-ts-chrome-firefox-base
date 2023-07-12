import Browser from "webextension-polyfill";

Browser.devtools.panels
  .create(
    "Test Devtools", // title
    "/icons/icon32.png", // icon
    "/html/devtools.html" // content
  )
  .then((newPanel) => {
    // code invoked on panel creation
    console.log(newPanel);
  });
