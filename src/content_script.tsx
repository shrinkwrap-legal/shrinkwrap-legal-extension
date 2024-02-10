/*
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.color) {
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change color to " + msg.color);
  } else {
    sendResponse("Color message is none.");
  }
});
*/



console.log("hello world");

// extract document number
const num = document
    .getElementById("MainContent_DocumentRepeater_JustizDocumentData_0_RechtssatznummerContainer_0");


if(num) {
  const docId = num.getElementsByTagName("a")?.item(0)?.textContent;
  chrome.runtime.sendMessage({docNumber: docId, court: '' })
}
