import React, {useEffect, useState} from "react"
import { WarningIcon } from "./Icons"
import {ModalPropsInterface} from "../types";

const Modal : React.FC<ModalPropsInterface> = ({ isOpen = false, children }) => {
    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${!isOpen && "hidden"}`}>
            <div className="flex items-end justify-center h-full min-h-screen pt-4 px-4 pb-20 text-center sm:block">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full`} role="dialog" aria-modal="true" aria-labelledby="modal-headline">

                    {children}

                </div>
            </div>
        </div>
    )
}

export default React.memo(Modal)