import React from "react"
import Modal from "./Modal";
import {ShowModalPropsInterface} from "../types";

const ShowModal : React.FC<ShowModalPropsInterface> = ({isOpen, task, setIsOpen, taskRemoveHandler}) => {
    return (
        <Modal isOpen={isOpen}>
            <>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-2xl leading-6 font-medium text-gray-900" id="modal-headline">
                                {task.title}
                            </h3>
                            <div className="mt-2">
                                <p className="text-gray-500">
                                    {task.description ? task.description : "Pas de description pour la tâche."}

                                    <span className="block mt-4 text-sm text-gray-400">
                                        Tâche créer {window.moment(task.created_at).calendar()} <br />
                                        Dernière mise à jours faite {window.moment(task.updated_at).calendar()}
                                    </span>
                                </p>
                                <p className={"mt-4"}>
                                    Status :
                                    <span className={`ml-2 text-white ${task.completed ? "bg-green-500" : "bg-indigo-500"} py-1 px-2 rounded`}>
                                        {task.completed ? "Fait" : "A Faire"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button onClick={() => {
                        taskRemoveHandler()
                        setIsOpen(false)
                    }} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                        Supprimer
                    </button>
                    <button onClick={() => setIsOpen(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                        Annuler
                    </button>
                </div>
            </>
        </Modal>
    )
}

export default React.memo(ShowModal)