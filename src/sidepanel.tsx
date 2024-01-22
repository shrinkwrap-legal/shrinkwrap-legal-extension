import React from 'react';
import {createRoot} from "react-dom/client";

const Sidepanel = () => {

    return <div>TSX Element</div>;

}


const root = createRoot(document.getElementById("root")!);

root.render(
    <React.StrictMode>
        <Sidepanel />
    </React.StrictMode>
);