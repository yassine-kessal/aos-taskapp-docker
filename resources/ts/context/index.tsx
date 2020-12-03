import React from "react"
import {ProviderPropsInterface} from "../types";
import {AuthProvider} from "./auth-context";
import {ThemeProvider} from "./theme-context";

const AppProviders = ({children}:ProviderPropsInterface) => {

    return (
        <ThemeProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ThemeProvider>
    )
}

export default AppProviders