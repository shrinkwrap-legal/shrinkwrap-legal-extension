import './styles/shrinkwrap.scss';

import React, { useCallback, useEffect, useState } from 'react';
import { createRoot } from "react-dom/client";
import { api } from './api';
import { Message } from "./types/sidepanel.types";
import {Button} from "react-bootstrap";

const SidePanel = () => {
    const [risMessage,setRisMessage] = useState<Message|undefined>(undefined);

    const handleClick = useCallback(async () => {
        if(risMessage) {
            const result = await api.getShrinkwrapDocument({ docNumber: risMessage.docNumber, court: risMessage.court});
        } {

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
            <p>ECLI: {risMessage?.ecli ?? ''}</p>
            <p>Gericht/Abfrage: {risMessage?.court ?? ''}</p>
            <div>
                <Button onClick={handleClick}>Zusammenfassung erstellen</Button>
            </div>
        </div>);
}


const root = createRoot(document.getElementById("root")!);

root.render(
    <React.StrictMode>
        <SidePanel />
    </React.StrictMode>
);