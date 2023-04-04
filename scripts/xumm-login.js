
import ReactDOM from 'react-dom/client';
import React from "react"
import XummButton from "./Components/XummButton"
 
const rootElements = document.getElementsByClassName("xumm-login")

for(let i = 0; i < rootElements.length; i++){
    ReactDOM.createRoot(rootElements[i]).render(
    <React.StrictMode>
        <XummButton />
    </React.StrictMode>
    )
}

