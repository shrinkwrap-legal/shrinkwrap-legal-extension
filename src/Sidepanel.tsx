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
      <p>DocNumber: {risMessage?.docNumber ?? ""}</p>
      <p>ECLI: {risMessage?.ecli ?? ""}</p>
      <p>Gericht/Abfrage: {risMessage?.court ?? ""}</p>
      <div>
        <LoadingButton isLoading={isFetching} onClick={handleClick}>
          Zusammenfassung erstellen
        </LoadingButton>
      </div>
        {error ? <div>Uups, es ist mir leider ein Fehler passiert.</div>
            : data &&
            <div>
                <p>Anzahl Wörter: {data.wordCount}</p>
                <p>Ausgang: {data.summary?.ausgang}</p>
                <p>Boulevard: {data.summary?.zeitungstitel_boulevard}</p>
                <p>Öffentlichkeit: {data.summary?.zeitungstitel_oeffentlich}</p>
                <p>Rechtszeitschrift: {data.summary?.zeitungstitel_rechtszeitschrift}</p>
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
