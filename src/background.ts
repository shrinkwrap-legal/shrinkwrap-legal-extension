//not available in firefox
if (chrome.sidePanel) {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
}

//open page after fresh install
chrome.runtime.onInstalled.addListener(function (object) {
  if (process.env.OPEN_ON_INSTALL && object.reason === "install") {
    chrome.tabs.create({ url: process.env.OPEN_ON_INSTALL }, function (tab) {
      console.log("Intro page launched");
    });
  }
});
