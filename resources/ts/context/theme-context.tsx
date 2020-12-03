import React, {Context, useCallback, useState} from "react"
import {ProviderPropsInterface} from "../types";

const defaultTheme = {
    isLoading: false,
    enableLoading: () => {},
    disableLoading: () => {},
}

const ThemeContext = React.createContext(defaultTheme)

export const ThemeProvider = (props: ProviderPropsInterface) => {
    const [isLoading, setIsLoading] = useState(defaultTheme.isLoading)

    const enableLoading = useCallback(() => setIsLoading(true), [])
    const disableLoading = useCallback(() => setIsLoading(false), [])

    const value = React.useMemo(() => {
        return {
            isLoading,
            enableLoading,
            disableLoading
        }
    }, [isLoading])

    return (
        <ThemeContext.Provider value={value} {...props} />
    )
}

export const useTheme = () => React.useContext(ThemeContext)