


console.log("hello shrinkwrap");

// extract document number
const num = document
    .getElementById("MainContent_DocumentRepeater_JustizDocumentData_0_RechtssatznummerContainer_0");

// extract court from search url
const params = window.location.search;
const urlParams = new URLSearchParams(params);
const court = urlParams.get('Abfrage');

const docNumber = contains('div','Dokumentnummer');
console.log('shrink docnumber', docNumber);


if(num) {
  const docId = num.getElementsByTagName("a")?.item(0)?.textContent;
  chrome.runtime.sendMessage({docNumber: docId, court: court })
}


/**
 * https://stackoverflow.com/questions/17799236/native-javascript-equivalent-of-jquery-contains-selector
 * @param selector element selector
 * @param text contains text
 */
function contains(selector: string, text: string) {
  const elements = document.querySelectorAll(selector);
  return [].filter.call(elements, (element: any) =>{
    return RegExp(text).test(element.textContent);
  });
}