import {api} from "./api";

function runShrinkwrapTasks() {


// MainContent_DocumentRepeater_JustizDocumentData_0_EcliContainer_0
  //determine page: search page, document result page

  if (window.location.pathname === "/Dokument.wxe") {
    console.log("hello RIS, it's shrinkwrap extracting doc info");

    // extract court from search url
    const params = window.location.search;
    const urlParams = new URLSearchParams(params);
    const court = urlParams.get('Abfrage');
    const docNumber = urlParams.get('Dokumentnummer');

    console.log(`document ${docNumber} by court ${court}`)

    if(court && docNumber) {
      chrome.runtime.sendMessage({docNumber: docNumber, court: court })
    }
  }
  else if (window.location.pathname === "/Ergebnis.wxe") {
    console.log("hello RIS, it's shrinkwrap extracting search info");

    //get all URLs to single judgements, if any
    let elements = Array.from(document.querySelectorAll('a'))
        .filter(elem => { return elem.hasAttribute("href") })
        .filter(elem => {
      let url = new URL(elem.getAttribute('href')!, window.location.origin);
      return url.pathname.startsWith("/Dokument.wxe");
    }).map(elem => ({element: elem, href: elem.href}));
    console.log(elements)

    //extract court and DokumentNummer
    elements.forEach((elem) => {
      const url = new URL(elem.href, window.location.origin);
      const urlParams = new URLSearchParams(url.searchParams);
      const court = urlParams.get('Abfrage');
      const docNumber = urlParams.get('Dokumentnummer');
      elem.element.innerHTML += ` <br><span style="color:gray">(${court}, ${docNumber})</span>`

      api.getCaselawOverview({
        docNumber: docNumber!,
        court: court!
      }).then((res) => {
        console.log("fetched " + res.status);
      })
    })
  }

}

const host = window.location.host;
if (host === "www.ris.bka.gv.at" || host === "ris.bka.gv.at" ) {
  runShrinkwrapTasks();
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