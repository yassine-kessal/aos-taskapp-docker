import React, {useCallback, useEffect, useState} from "react"
import {ProviderPropsInterface, UserType} from "../types";
import {useRequest} from "../hooks";

const defaultAuth = {
    user: false,
    loginUser: () => {},
    logoutUser: () => {},
}

const AuthContext = React.createContext(null)

/**
 * Auth Provider
 *
 * @param props
 * @constructor
 */
export const AuthProvider = (props: ProviderPropsInterface) => {
    const [user, setUser] = useState<boolean|UserType>(defaultAuth.user)
    const {exec: execGetUser, data} = useRequest({
        url: '/user',
    })

    // Login and logout global states function
    const loginUser = useCallback((newUser) => setUser(newUser), [user])
    const logoutUser = useCallback(() => {
        localStorage.removeItem('auth-token')
        setUser(false)
    }, [user])

    // Save on memo to avoid multiple render
    const value = React.useMemo(() => {
        return {
            user,
            loginUser,
            logoutUser
        }
    }, [user])

    // Verify if auth-token is present and authenticate user if he's valid
    const authToken = localStorage.getItem('auth-token')

    useEffect(() => {
        if(!user)
        {
            if(authToken) {
                execGetUser({}, (result: UserType) => {
                    setUser(result)
                })
            }
        }
    }, [authToken, user])

    return (
        <AuthContext.Provider value={value} {...props} />
    )
}

export const useAuth = () => React.useContext(AuthContext)