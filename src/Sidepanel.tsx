import "./styles/shrinkwrap.scss";

import React, { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Message } from "./types/sidepanel.types";
import { useShrinkwrapDocument } from "./hooks/useShrinkwrapDocument";
import { LoadingButton } from "./components/LoadingButton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const SidePanel = () => {
  const [risMessage, setRisMessage] = useState<Message | undefined>(undefined);

  const { refetch: loadDocument, data, error, isFetching } = useShrinkwrapDocument(risMessage);

  const handleClick = useCallback(async () => {
      await loadDocument();
  }, [risMessage]);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg: Message, sender) => {
      console.log("message received", msg, sender);

      setRisMessage(msg);
    });
  }, []);

  return (
    <div>
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title bg-secondary">RIS Dokument</h5>
                <p>DocNumber: {risMessage?.docNumber ?? ""}</p>
                <p>ECLI: {risMessage?.ecli ?? ""}</p>
                <p>Gericht/Abfrage: {risMessage?.court ?? ""}</p>
            </div>
        </div>

      <div className="mb-3">
        <LoadingButton isLoading={isFetching} onClick={handleClick}>
          Ergebnis generieren
        </LoadingButton>
      </div>
        {error ? <div>Uups, es ist mir leider ein Fehler passiert.</div>
            : data &&
            <div>

                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title  bg-secondary">{data.summary?.zeitungstitel_boulevard}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{data.summary?.zeitungstitel_oeffentlich}</h6>
                        <p className="card-text">{data.summary?.zeitungstitel_rechtszeitschrift}</p>
                    </div>
                </div>
                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Metadaten</h5>
                        <div className="list-group">
                            <div className="list-group-item">
                                Ausgang: {data.summary?.ausgang}
                            </div>
                            <div className={"list-group-item"}>
                                Anzahl Wörter: {data.wordCount}
                            </div>
                            <div className={"list-group-item"}>
                                Sachverhalt: {data.summary?.sachverhalt}
                            </div>
                            <div className={"list-group-item"}>
                                Rechtsmittel: {data.summary?.rechtsmittel}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        }
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
