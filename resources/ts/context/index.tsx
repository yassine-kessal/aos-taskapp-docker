import React from "react"
import {ProviderPropsInterface} from "../types";
import {AuthProvider} from "./auth-context";
import {ThemeProvider} from "./theme-context";
import { ToastProvider } from 'react-toast-notifications'

/**
 * AppProviders component (List all provider)
 *
 * @param children
 * @constructor
 */
const AppProviders = ({children}:ProviderPropsInterface) => {

    return (
        <ToastProvider autoDismiss={true}>
            <ThemeProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </ThemeProvider>
        </ToastProvider>
    )
}

export default AppProviders