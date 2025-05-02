import {api, GetShrinkwrapDocumentParamsCourtEnum} from "./api";

function getEcliFromContent(): string | null | undefined {
  const ecliContainer = window.document.getElementById(
    "MainContent_DocumentRepeater_JustizDocumentData_0_EcliContainer_0",
  );
  if (ecliContainer) {
    return ecliContainer.lastChild?.textContent;
  }
  return null;
}

function runShrinkwrapTasks() {
  const ecli = getEcliFromContent();

  if (window.location.pathname === "/Dokument.wxe") {
    console.log("hello RIS, it's shrinkwrap extracting doc info");

    // extract court from search url
    const params = window.location.search;
    const urlParams = new URLSearchParams(params);
    const court = urlParams.get("Abfrage");
    const docNumber = urlParams.get("Dokumentnummer");

    console.log(`document ${docNumber} by court ${court}`);

    if (court && docNumber) {
      chrome.runtime.sendMessage({
        docNumber: docNumber,
        court: court,
        ecli: ecli?.trim(),
      });
    }
  } else if (window.location.pathname === "/Ergebnis.wxe") {
    console.log("hello RIS, it's shrinkwrap extracting search info");

    //get all URLs to single judgements, if any
    let elements = Array.from(document.querySelectorAll("a"))
      .filter((elem) => {
        return elem.hasAttribute("href");
      })
      .filter((elem) => {
        let url = new URL(elem.getAttribute("href")!, window.location.origin);
        return url.pathname.startsWith("/Dokument.wxe");
      })
      .map((elem) => ({ element: elem, href: elem.href }));
    console.log(elements);

    //extract court and DokumentNummer
    elements.forEach((elem) => {
      const url = new URL(elem.href, window.location.origin);
      const urlParams = new URLSearchParams(url.searchParams);
      let court = urlParams.get("Abfrage");

      //court has to be correct casing
      const allowedCourts = ["Justiz", "VwGH", "VfGH", "BVwG", "LVwG", "DSB", "GBK"];
      court = allowedCourts.filter(c => c.toLowerCase() == court?.toLowerCase())[0]

      const docNumber = urlParams.get("Dokumentnummer");

      api
        .getShrinkwrapDocument({
          docNumber: docNumber!,
          court: court! as GetShrinkwrapDocumentParamsCourtEnum,
        })
        .then((res) => {
          //try adding a new line above the element
          let tableRow = elem?.element?.parentElement?.parentElement;
          if (tableRow) {
            let newRow = document.createElement("tr");
            newRow.classList.add(...tableRow.classList)
            let wordInfo = `<span style="color:gray">(${res.data.wordCount} Wörter)</span>`;
            let title = `<span>${res.data.summary?.zeitungstitel_boulevard || ''}</span>`
            newRow.innerHTML = `<td style="padding-left: 10px" colspan="8" class="bocListDataCell">${wordInfo} ${title}</td>`;
            tableRow.before(newRow);
          }
        });
    });
  }
}

const host = window.location.host;
if (host === "www.ris.bka.gv.at" || host === "ris.bka.gv.at") {
  runShrinkwrapTasks();
}

/**
 * https://stackoverflow.com/questions/17799236/native-javascript-equivalent-of-jquery-contains-selector
 * @param selector element selector
 * @param text contains text
 */
function contains(selector: string, text: string) {
  const elements = document.querySelectorAll(selector);
  return [].filter.call(elements, (element: any) => {
    return RegExp(text).test(element.textContent);
  });
}
