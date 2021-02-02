import React from "react"
import Navbar from "../components/Navbar"
import TodoPage from "../pages/TodoPage"
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PrivateRoute from "../components/Route/PrivateRoute";
import GuestRoute from "../components/Route/GuestRoute";

const DefaultLayout : React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />

                <div className="mt-8 max-w-5xl mx-auto px-2 lg:px-8">
                    <Switch>
                        <GuestRoute path={"/login"}>
                            <LoginPage />
                        </GuestRoute>
                        <GuestRoute path={"/register"}>
                            <RegisterPage />
                        </GuestRoute>
                        <PrivateRoute strict={true} exact={true} path={"/"}>
                            <TodoPage />
                        </PrivateRoute>
                    </Switch>
                </div>
            </BrowserRouter>
        </>
    )
}

export default DefaultLayout