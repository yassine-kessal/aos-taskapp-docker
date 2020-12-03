import React, {useCallback, useState} from "react"
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import {AddTaskFormPropsInterface, InputRequestType, TaskType} from "../types";
import {useRequest} from "../hooks";

/**
 * AddTaskForm Component
 *
 * @param onTaskAdded
 * @param tasks
 * @constructor
 */
const AddTaskForm : React.FC<AddTaskFormPropsInterface> = ({ onTaskAdded, tasks }) => {
    // Create the add task request and the handler
    const [titleTask, setTitleTask] = useState("")

    const {exec: execAddTask, errors: inputErrors, setErrors: setInputErrors} : InputRequestType = useRequest({
        method: "POST"
    })

    const onInputSubmitted = useCallback(async (e) => {
        await execAddTask({
            url: `/task`,
            data: {
                title: titleTask
            }
        }, (addedTask: TaskType) => {
            onTaskAdded(addedTask)
            setTitleTask(null)
        })
    }, [titleTask, inputErrors])

    return (
        <>
            <Input
                name={"title"}
                placeholder={"Ajouter une tâche à faire (ex: Faire les courses, ...)"}
                onChange={
                    (e) => {
                        setTitleTask(e.target.value)

                        setInputErrors({
                            title: ""
                        })
                    }
                }
                value={titleTask}
                onSubmit={onInputSubmitted}
                error={inputErrors.title || null}
            />

            <div className="ml-2">
                <SubmitButton text={"Ajouter"} onClick={onInputSubmitted} />
            </div>
        </>
    )
}

export default React.memo(AddTaskForm)