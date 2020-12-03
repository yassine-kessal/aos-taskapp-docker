import React, {useCallback, useState} from "react"
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import {AddTaskFormPropsInterface, inputRequestType, TaskType} from "../types";
import {useRequest} from "../hooks";

const AddTaskForm : React.FC<AddTaskFormPropsInterface> = ({ setTasks, tasks }) => {
    // Create the add task request and the handler
    const [titleTask, setTitleTask] = useState("")

    const {exec: execAddTask, errors: inputErrors, setErrors: setInputErrors} : inputRequestType = useRequest({
        method: "POST"
    })

    const onInputSubmitted = useCallback(async (e) => {
        await execAddTask({
            url: `/task`,
            data: {
                title: titleTask
            }
        }, (addedTask: TaskType) => {
            setTasks((tasks: TaskType[]) => [addedTask, ...tasks])
            setTitleTask(null)
        })
    }, [tasks, titleTask, inputErrors])

    return (
        <>
            <Input
                name={"title"}
                placeholder={"Ajouter une tâche à faire (ex: Faire les courses, ...)"}
                onChange={
                    (e) => {
                        setTitleTask(e.target.value)

                        setInputErrors((errors: { title?: string }) => ({
                            ...errors,
                            title: ""
                        }))
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