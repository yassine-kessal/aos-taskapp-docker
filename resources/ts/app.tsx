import "./bootstrap"
import React from "react"
import { render } from "react-dom"
import DefaultLayout from "./layouts/Default";
import AppProviders from "./context";

render(
    (
        <AppProviders>
            <DefaultLayout />
        </AppProviders>
    ), document.getElementById("aos-task"))


