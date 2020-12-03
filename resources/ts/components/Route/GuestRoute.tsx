import React, {useEffect} from "react"
import {useAuth} from "../../context/auth-context";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {useToasts} from "react-toast-notifications";

/**
 * Guest Route (Redirect User to login page if not authenticated)
 *
 * @param children
 * @param rest
 * @constructor
 */
const  GuestRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    const auth = useAuth();
    const {addToast} = useToasts()

    useEffect(() => {
        if(auth.user)
            addToast("Vous êtes déjà connecté", { appearance: "success" })
    }, [auth])

    return (
        <Route
            {...rest}
            render={({ location }) =>
                !auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default GuestRoute