import React, {useCallback, useState} from "react"
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import {useRequest} from "../hooks";
import {LoginRequestType} from "../types";

/**
 * Login Page
 *
 * @constructor
 */
const LoginPage : React.FC = () => {
    const [email, setEmail] = useState<string>(null)
    const [password, setPassword] = useState<string>(null)

    // Create the login request and the handler
    const {exec: execLogin, errors, data}:LoginRequestType = useRequest({
        method: "POST"
    })

    const handleLogin = useCallback(async (e) => {
        e.preventDefault()

        await execLogin({
            url: "/login",
            data: {
                email,
                password,
                device_name: navigator.userAgent
            }
        },
        async (result: string) => {
            localStorage.setItem('auth-token', result) // save the token when login successful
        })
    }, [email, password])

    return (
        <div className={"max-w-xl mx-auto bg-gray-100 p-10 rounded"}>

            <h1 className={"text-xl"}>Connexion</h1>

            <div className={"mt-5"}>
                <div className={"mb-2"}>
                    <Input name={"email"} onSubmit={handleLogin} error={errors.email || null} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"Email"} />
                </div>

                <div className={"mb-2"}>
                    <Input name={"password"} onSubmit={handleLogin} error={errors.password || null} value={password} onChange={(e) => setPassword(e.target.value)} type={"password"} placeholder={"Mot de passe"} />
                </div>

                <div className="text-right">
                    <SubmitButton onClick={handleLogin} text={"Se connecter"} />
                </div>
            </div>

        </div>
    )
}

export default LoginPage