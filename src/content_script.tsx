import "./styles/content.scss";
import React from "react";
import {createRoot} from "react-dom/client";
import {ShrinkwrapRow} from "./components/ShrinkwrapRisResultRow";
import {ShrinkwrapAnalysis} from "./components/ShrinkwrapRisResultAnalysis";
import {harmonizeCourtCasing} from "./utils/string-utils";
import {ShrinkwrapModal} from "./components/ShrinkwrapModal";
import {ShrinkwrapModalInitial} from "./components/ShrinkwrapModalInitial";
import { StandardSearchSetter } from './components/StandardSearchSetter';


function runShrinkwrapTasks() {
  //const ecli = getEcliFromContent();

  if (window.location.pathname === "/Dokument.wxe") {
    console.log("hello RIS, it's shrinkwrap extracting doc info");

    // extract court from search url
    const params = window.location.search;
    const urlParams = new URLSearchParams(params);
    let court = harmonizeCourtCasing(urlParams.get("Abfrage"));
    const docNumber = urlParams.get("Dokumentnummer");
    //court has to be correct casing

    if (court == null) { return; }

    console.log(`document ${docNumber} by court ${court}`);

    //show info to user
    appendModal(document);

    let contentElem = document.querySelector(".document");
    if (docNumber && contentElem) {
      //load and prepend component to first document selector
      let shrinkwrapElem = document.createElement("div");

      const root = createRoot(shrinkwrapElem);
      root.render(
        <ShrinkwrapAnalysis
          key={'analysis_' + court + '_' + docNumber}
          docNumber={docNumber}
          court={court}
        />,
      );
      contentElem.before(shrinkwrapElem);
    }

    if (court && docNumber) {
      chrome.runtime.sendMessage({
        docNumber: docNumber,
        court: court,
        //ecli: ecli?.trim(),
      });
    }
  } else if (window.location.pathname === "/Ergebnis.wxe") {
    console.log("hello RIS, it's shrinkwrap extracting search info");
    const searchParams = window.location.search;
    const searchUrlParams = new URLSearchParams(searchParams);
    let searchCourt = harmonizeCourtCasing(searchUrlParams.get("Abfrage"));
    if (searchCourt != null && searchUrlParams.get("SucheNachText") === "True") {
      //show Modal if still wanted by user
      appendModal(document);
    }


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
      let court = harmonizeCourtCasing(urlParams.get("Abfrage"));
      if (court == null) { return; }

      const docNumber = urlParams.get("Dokumentnummer");

      let tableRow = elem?.element?.parentElement?.parentElement;
      let children = tableRow?.querySelectorAll("td.bocListDataCell").length;
      if (tableRow && docNumber != null) {
        let newRow = document.createElement("tr");
        newRow.classList.add(...tableRow.classList)

        const root = createRoot(newRow);
        root.render(<ShrinkwrapRow
            docNumber={docNumber}
            court={court}
            children={((children && children>7)?children:8)}
        />);
        tableRow.before(newRow);
      }
    });
  } else if (window.location.hash === "#shrinkwrap") {
    appendModalInitial(document);
  } else if (window.location.pathname === "/Vfgh/" ||
    window.location.pathname === "/Vwgh/" ||
    window.location.pathname === "/Jus/" ||
    window.location.search === "?Abfrage=Justiz&WxeReturnToSelf=True&TabbedMenuSelection=JudikaturTab" ||
    window.location.pathname === "/Bvwg/" ||
    window.location.pathname === "/Lvwg/" ||
    window.location.pathname === "/Dsk/" ||
    window.location.pathname === "/Dok/") {

    //get rs checkbox
    let newRow = document.createElement("div");

    const root = createRoot(newRow);
    root.render(<StandardSearchSetter/>);
    document.querySelector("body")?.append(newRow);
  }
}

const host = window.location.host;
if (host === "www.ris.bka.gv.at" || host === "ris.bka.gv.at") {
  runShrinkwrapTasks();
}

function appendModal(document: Document) {
  //show Modal if still wanted by user
  let shrinkwrapModal = document.createElement("div");
  shrinkwrapModal.style.width = "100%";
  const shrinkwrapModalRoot = createRoot(shrinkwrapModal);
  shrinkwrapModalRoot.render(<ShrinkwrapModal/>);
  document.querySelector("body")?.append(shrinkwrapModal);
  console.log("appended modal");
}

function appendModalInitial(document: Document) {
  //show Modal if still wanted by user
  let shrinkwrapModal = document.createElement("div");
  shrinkwrapModal.style.width = "100%";
  const shrinkwrapModalRoot = createRoot(shrinkwrapModal);
  shrinkwrapModalRoot.render(<ShrinkwrapModalInitial/>);
  document.querySelector("body")?.append(shrinkwrapModal);
  console.log("appended modal");
}

