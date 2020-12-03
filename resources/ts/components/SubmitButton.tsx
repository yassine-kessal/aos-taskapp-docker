import React from "react"
import {SubmitButtonPropsInterface} from "../types";

/**
 * Submit Button Component
 *
 * @param text
 * @param onClick
 * @constructor
 */
const SubmitButton : React.FC<SubmitButtonPropsInterface> = ({ text = "Envoyer", onClick }) => {

    return (
        <button onClick={onClick} className={"px-4 py-2 rounded border-2 border-red-500 bg-red-500 text-white transition-colors hover:bg-white hover:text-red-500"}>
            {text}
        </button>
    )
}

export default SubmitButton