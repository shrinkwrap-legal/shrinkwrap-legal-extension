import React, {useCallback, useState} from 'react';
import { createRoot } from "react-dom/client";
import { api } from './api';
import {Message} from "./types/sidepanel.types";

const Sidepanel = () => {
    const [docNumber,setDocNumber] = useState<string|undefined>(undefined);

    const handleClick = useCallback(() => {
        if(docNumber) {
            const result = api.api.getShrinkwrapDocument({ docNumber: docNumber});
        }
    },[docNumber]);

    chrome.runtime.onMessage.addListener((msg: Message, sender) => {
        console.log("message received", msg, sender);
        setDocNumber(msg.docNumber);

    });

    return (
        <div>
            <p>DocNumber: {docNumber}</p>
            <div>
                <button onClick={handleClick}>Zusammenfassung erstellen</button>
            </div>
        </div>);
}


const root = createRoot(document.getElementById("root")!);

root.render(
    <React.StrictMode>
        <Sidepanel />
    </React.StrictMode>
);