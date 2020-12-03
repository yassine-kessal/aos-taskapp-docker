import React from "react"
import {useHistory} from "react-router-dom"

import { baseFrontedAppUrl } from "../bootstrap"
import {useTheme} from "../context/theme-context";
import {SpinnerIcon} from "./Icons";
import {useAuth} from "../context/auth-context";
import {useRequest} from "../hooks";

/**
 * Navbar Component
 *
 * @constructor
 */
const Navbar : React.FC = () => {
    const history = useHistory()
    const theme = useTheme()
    const auth = useAuth()

    // Create the logout request and the handler
    const {exec: execLogout} = useRequest({
        url: '/logout',
        method: 'post'
    })

    const handleLogout = React.useCallback(async () => {
        try {
            await execLogout({}, () => {
                auth.logoutUser()

                history.replace('/login')
            })
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <nav className="shadow py-4">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => history.push("/")}>
                            <img className="lg:block h-8 w-auto" src={baseFrontedAppUrl + "medias/images/aos-logo.png"} alt="AOS Logo" />
                        </div>
                        <div className="hidden md:block sm:ml-6">
                            <div className="flex space-x-4">
                                <a href="#"
                                   onClick={(e) => {
                                       e.preventDefault()

                                       history.push("/")
                                   }}
                                   className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900">TO-DO List</a>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {theme.isLoading && <SpinnerIcon />}
                        {auth.user &&
                            <>
                                <span className={"mr-2"}>Bienvenue {auth.user.name}</span>
                                <button onClick={handleLogout} className={"navbar--button"}>Déconnexion</button>
                            </>
                        }

                        {!auth.user &&
                            <>
                                <button onClick={() => history.push("/login")} className={"navbar--button mr-2"}>Connexion</button>
                                <button onClick={() => history.push("/register")} className={"navbar--button"}>Inscription</button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar