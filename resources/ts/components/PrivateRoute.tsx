import React from "react"
import {useAuth} from "../context/auth-context";
import {Route, Redirect, RouteProps} from "react-router-dom";

const  PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
    let auth = useAuth();
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