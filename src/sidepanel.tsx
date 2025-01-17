import './styles/shrinkwrap.scss';

import React, { useCallback, useEffect, useState } from 'react';
import { createRoot } from "react-dom/client";
import { api } from './api';
import { Message } from "./types/sidepanel.types";
import {Button} from "react-bootstrap";
import {QueryClient, QueryClientProvider} from "react-query";
import {useShrinkwrapDocument} from "./hooks/useShrinkwrapDocument";
import {LoadingButton} from "./components/LoadingButton";

const SidePanel = () => {
    const [risMessage,setRisMessage] = useState<Message|undefined>(undefined);

    const { isLoading, refetch, data, isFetching } = useShrinkwrapDocument(risMessage);

    const handleClick = useCallback(async () => {
        console.log('message', risMessage);
        if(risMessage) {
            await refetch();

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
                Loading: {JSON.stringify(isFetching)}
                <LoadingButton isLoading={isFetching} onClick={handleClick}>Zusammenfassung erstellen</LoadingButton>
            </div>
            {data &&
                (<div><p>Anzahl Wörter: {data.wordCount}</p></div>)}
        </div>);
}


const root = createRoot(document.getElementById("root")!);

const queryClient = new QueryClient();
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <SidePanel />
        </QueryClientProvider>
    </React.StrictMode>
);