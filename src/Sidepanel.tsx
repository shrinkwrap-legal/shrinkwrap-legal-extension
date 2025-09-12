import "./styles/shrinkwrap.scss";

import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Message } from "./types/sidepanel.types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {Form, FormLabel, FormSelect } from "react-bootstrap";
import { getSetting, storeSetting } from "./service/storage";

const SidePanel = () => {
    const [headline, setHeadline] = useState<string>('boulevard');
    useEffect(() => {
        chrome.runtime.onMessage.addListener((msg: Message, sender) => {
            console.log("message received", msg, sender);
        });
    }, []);

    useEffect(() => {
        async function getBrowserSettings() {
            const headlineSetting = await getSetting("headline");
            console.log('stored headline: ', headlineSetting);
            setHeadline(headlineSetting);
        }
        getBrowserSettings();

    }, []);

    const handleSelection = useCallback(async (e: ChangeEvent<HTMLSelectElement>) => {
        console.log('handleSelection called with: ', e.target.value);
        if (e.target.value) {
            storeSetting("headline", e.target.value);
            setHeadline(e.target.value);
        }
    }, []);


  return (
    <div className={"h-100 d-flex align-items-start flex-column"}>
        <div className={"row m-2 w-100"}>
            <div className={"col-1 align-content-center align-content-end"}>
                <div className="vibrate"></div>
            </div>
            <div className={"col-8"}>shrinkwrap.legal ist aktiv.</div>
        </div>
        <div className={"row mt-3 w-100"}>
            <p className={"lead"}>
                Surfen Sie im <a target={"_blank"} href={"https://ris.bka.gv.at/Judikatur/"}>Rechtsinformationssystem des Bundes (RIS)</a>,
                um KI-generierte Urteilsübersichten direkt im RIS zu erhalten.
            </p>
        </div>
        <div className={"row mt-3 w-100"}>
            <h3>Einstellungen</h3>
            <FormLabel htmlFor={'target'} >Zielgruppe</FormLabel>
            <FormSelect onChange={handleSelection} id={'target'} aria-label="Zielgruppe" value={headline}>
                <option value={'boulevard'}>Boulevard</option>
                <option value={'newspaper'}>Tageszeitung</option>
                <option value={'journal'}>Rechtszeitschrift</option>
            </FormSelect>

        </div>
        <div className={"mt-auto "}>
            <a href={"https://shrinkwrap.legal"} target={"_blank"} className={"text-muted"}>Impressum</a>
        </div>

    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SidePanel />
    </QueryClientProvider>
  </React.StrictMode>,
);
