import React, { useCallback, useEffect, useState } from 'react';
import { createRoot } from "react-dom/client";
import { api } from './api';
import { Message } from "./types/sidepanel.types";

const SidePanel = () => {
    const [risMessage,setRisMessage] = useState<Message|undefined>(undefined);

    const handleClick = useCallback(async () => {
        if(risMessage) {
            const result = await api.api.getShrinkwrapDocument({ docNumber: risMessage.docNumber, court: risMessage.court});
        }
    },[risMessage]);

    useEffect(() => {
        chrome.runtime.onMessage.addListener((msg: Message, sender) => {
            console.log("message received", msg, sender);

            setRisMessage(msg);

        });
    }, []);


    return (
        <div>
            <p>DocNumber: {risMessage?.docNumber ?? ''}</p>
            <p>Gericht/Abfrage: {risMessage?.court ?? ''}</p>
            <div>
                <button onClick={handleClick}>Zusammenfassung erstellen</button>
            </div>
        </div>);
}


const root = createRoot(document.getElementById("root")!);

root.render(
    <React.StrictMode>
        <SidePanel />
    </React.StrictMode>
);