import React, {ChangeEventHandler} from "react"
import {InputPropsInterface} from "../types";

const Input: React.FC<InputPropsInterface> = ({id, name, type = "text", placeholder, error, onChange, onSubmit, value }) => {
    return (
        <div className={"w-full"}>
            <input
                id={id}
                name={name}
                value={value || ""}
                onKeyDown={e => {
                    if(e.key === "Enter")
                        onSubmit(e)
                }}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                className={`p-2 rounded border ${error ? "border-red-500" : "border-gray-400"} w-full mr-2`} />
            {error && <span className="text-red-500 font-light">{error}</span>}
        </div>
    )
}

export default React.memo(Input)