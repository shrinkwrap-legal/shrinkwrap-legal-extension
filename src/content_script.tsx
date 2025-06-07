import {api, GetShrinkwrapDocumentParamsCourtEnum} from "./api";
import "./styles/content.scss";
import React, {useState} from "react";
import {createRoot} from "react-dom/client";

function getEcliFromContent(): string | null | undefined {
  const ecliContainer = window.document.getElementById(
    "MainContent_DocumentRepeater_JustizDocumentData_0_EcliContainer_0",
  );
  if (ecliContainer) {
    return ecliContainer.lastChild?.textContent;
  }
  return null;
}

interface ShrinkwrapRowProps {
  wordCount?: number;
  title: string;
  summary: string;
}

const ShrinkwrapRow: React.FC<ShrinkwrapRowProps> = ({wordCount, title, summary}) => {
  const [showSummary, setShowSummary] = useState(false);
  return (
      <td colSpan={8} className={`shrinkwrapRow bocListDataCell ${showSummary ? ' showSummary' : ''}`}
          onClick={() => setShowSummary(s => !s)}>
        <span style={{color: 'grey'}}>({wordCount} Wörter)</span>&ensp;
        <span className="shrinkwrapTitle">{title}</span>
        {showSummary && (
            <div className="shrinkwrapSummary">{summary}</div>
        )}
      </td>

  );
};


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

            const root = createRoot(newRow);
            root.render(<ShrinkwrapRow
                wordCount={res.data.wordCount}
                title={res.data.summary?.zeitungstitel_boulevard || ''}
                summary={res.data.summary?.zusammenfassung_3_saetze || ''}
            />);
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
