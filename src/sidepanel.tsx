import React, { useCallback } from 'react';
import { createRoot } from "react-dom/client";
import { api } from './api';

const Sidepanel = () => {

    const handleClick = useCallback(() => {
        const result = api.general.getGeneralInfo();
    },[]);

    return <div><button onClick={handleClick}>Test API</button> </div>;

}


const root = createRoot(document.getElementById("root")!);

root.render(
    <React.StrictMode>
        <Sidepanel />
    </React.StrictMode>
);