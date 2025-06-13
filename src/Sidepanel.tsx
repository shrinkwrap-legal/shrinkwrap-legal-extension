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
