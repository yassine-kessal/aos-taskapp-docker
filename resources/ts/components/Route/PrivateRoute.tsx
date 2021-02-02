import React, {useEffect} from "react"
import {useAuth} from "../../context/auth-context";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {useToasts} from "react-toast-notifications";

/**
 * Private Route (Redirect User to login page if authenticated)
 *
 * @param children
 * @param rest
 * @constructor
 */
const  PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    const auth = useAuth()
    const {addToast} = useToasts()

    useEffect(() => {
        if(!auth.user)
            addToast("Vous devez vous connecter pour accéder à vos tâches", { appearance: "error" })
    }, [auth])

    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute