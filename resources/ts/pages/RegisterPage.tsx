import React, {useCallback, useState} from "react"
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import {useRequest} from "../hooks";
import {useHistory} from "react-router"
import {RegisterRequestType} from "../types";
import {useToasts} from "react-toast-notifications";

/**
 * Register Page
 *
 * @constructor
 */
const RegisterPage : React.FC = () => {
    const history = useHistory()
    const {addToast} = useToasts()

    const [name, setName] = useState<string>(null)
    const [email, setEmail] = useState<string>(null)
    const [password, setPassword] = useState<string>(null)
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>(null)

    // Create the register request and the handler
    const {exec: execRegistration, errors}:RegisterRequestType = useRequest({
        url: '/register',
        method: 'post',
        data: {
            name,
            email,
            password,
            passwordConfirmation
        }
    })

    const handleRegister = useCallback(async(e) => {
        e.preventDefault()

        try {
            await execRegistration(
                {},
                () => {
                    addToast("Vous pouvez désormais vous connecter", {appearance: 'success'})

                    history.push('/')
                }
            )
        }
        catch (e) {
            console.log(e)
        }
    }, [name, email, password, passwordConfirmation])

    return (
        <div className={"max-w-xl mx-auto bg-gray-100 p-10 rounded"}>

            <h1 className={"text-xl"}>Inscription</h1>

            <div className={"mt-5"}>
                <div className={"mb-2"}>
                    <Input name={"name"} onSubmit={handleRegister} error={errors.name} value={name} onChange={(e) => setName(e.target.value)} placeholder={"Nom complet"} />
                </div>

                <div className={"mb-2"}>
                    <Input name={"email"} onSubmit={handleRegister} error={errors.email} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"Email"} />
                </div>

                <div className={"mb-2"}>
                    <Input name={"password"} onSubmit={handleRegister} error={errors.password} value={password} onChange={(e) => setPassword(e.target.value)} type={"password"} placeholder={"Mot de passe"} />
                </div>

                <div className={"mb-2"}>
                    <Input name={"passwordConfirmation"} onSubmit={handleRegister} error={errors.passwordConfirmation} value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} type={"password"} placeholder={"Confirmation mot de passe"} />
                </div>

                <div className="text-right">
                    <SubmitButton onClick={handleRegister} text={"S'inscrire"} />
                </div>
            </div>

        </div>
    )
}

export default RegisterPage