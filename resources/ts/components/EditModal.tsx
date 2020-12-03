import React, {useCallback, useState} from "react"
import Modal from "./Modal";
import {EditModalPropsInterface, EditModalRequestType, TaskType} from "../types";
import Input from "./Input";
import {useRequest} from "../hooks";

/**
 * Edit modal component
 *
 * @param isOpen
 * @param task
 * @param setIsOpen
 * @param onTaskEdited
 * @constructor
 */
const EditModal: React.FC<EditModalPropsInterface> = ({isOpen, task, setIsOpen, onTaskEdited}) => {
    const [title, setTitle] = useState<string>(task.title)
    const [description, setDescription] = useState<string>(task.description)

    // Create the edit task request and the handler
    const {exec: execEditTask, errors}:EditModalRequestType = useRequest({
        method: "PATCH"
    })

    const taskEditHandler = useCallback(async () => {
        if(confirm('Vous êtes sure de vouloir modifier la tâche ?')) {
            await execEditTask({
                url: `/task/${task._id}`,
                data: {
                    title,
                    description,
                }
            }, (editedTask:TaskType) => onTaskEdited(editedTask))
        }
    }, [title, description])

    return (
        <Modal isOpen={isOpen}>
            <>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <div className="mb-2">
                                <label className={"mb-1 cursor-pointer"} htmlFor={`title-${task._id}`}>Titre de la tâche : </label>
                                <Input
                                    id={`title-${task._id}`}
                                    placeholder={"Titre de la tâche"}
                                    name={"title"}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    onSubmit={() => {
                                        taskEditHandler()
                                        setIsOpen(false)
                                    }}
                                    error={errors.title}
                                    />
                            </div>

                            <div className="mb-2">
                                <label className={"mb-1 cursor-pointer"} htmlFor={`description-${task._id}`}>Description de la tâche : </label>

                                <textarea id={`description-${task._id}`}
                                          placeholder={"Description de la tâche"}
                                          name={"description"}
                                          onChange={(e) => setDescription(e.target.value)}
                                          onSubmit={taskEditHandler}
                                          defaultValue={description}
                                          className={`p-2 rounded border ${errors.description ? "border-red-500" : "border-gray-400"} w-full mr-2`}
                                >
                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button onClick={() => {
                        taskEditHandler()
                        setIsOpen(false)
                    }} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                        Modifier
                    </button>
                    <button onClick={() => setIsOpen(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                        Annuler
                    </button>
                </div>
            </>
        </Modal>
    )
}

export default React.memo(EditModal)