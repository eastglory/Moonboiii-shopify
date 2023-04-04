
import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import React from "react"
import RegisterForm from "./Components/RegisterForm"
 
const rootEl = document.getElementById("register-form")
const root = ReactDOMClient.createRoot(rootEl)

rootEl && root.render(
    <RegisterForm />
)
