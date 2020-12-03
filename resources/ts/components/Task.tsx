import React, {useCallback, useState} from "react"
import {EditIcon, RemoveIcon, ShowIcon} from "./Icons";
import {TaskPropsInterface} from "../types";
import {useRequest} from "../hooks";
import ShowModal from "./ShowModal";
import EditModal from "./EditModal";

/**
 * Task Component
 *
 * @param task
 * @param onTaskRemoved
 * @param onTaskEdited
 * @param onTaskToggle
 * @param completedFilter
 * @constructor
 */
const Task : React.FC<TaskPropsInterface> = ({ task, onTaskRemoved, onTaskEdited, onTaskToggle, completedFilter = "all" }) => {
    // Create the remove task request and the handler
    const {exec: execRemoveTask} = useRequest({
        method: "DELETE"
    })

    const taskRemoveHandler = useCallback(async () => {
        if(confirm('Vous êtes sure de vouloir supprimer la tâche ?')) {
            await execRemoveTask({
                url: `/task/${task._id}`,
            }, () => onTaskRemoved(task))
        }
    }, [])

    // Create the toggle task request and the handler
    const {exec: execToggleCompleteTask} = useRequest({
        method: "PATCH"
    })

    const taskToggleHandler = useCallback(async () => {
        await execToggleCompleteTask({
            url: `/task/${task._id}/completed`
        }, onTaskToggle)
    }, [])

    // modal states
    const [isShowModalOpened, setIsShowModalOpened] = useState<boolean>(false)
    const [isEditModalOpened, setIsEditModalOpened] = useState<boolean>(false)

    // completedFilter
    if(completedFilter === "completed" && task.completed === false)
        return
    else if(completedFilter === "todo" && task.completed === true)
        return

    return (
        <div className={"bg-gray-100 p-4 rounded mt-2"}>

            {isShowModalOpened &&
                <ShowModal task={task} isOpen={isShowModalOpened} setIsOpen={setIsShowModalOpened} taskRemoveHandler={taskRemoveHandler} />
            }
            {isEditModalOpened &&
                <EditModal task={task} isOpen={isEditModalOpened} setIsOpen={setIsEditModalOpened} onTaskEdited={onTaskEdited} />
            }

            <div className={"flex"}>
                <div className={"mr-5"}>
                    <input
                        id={`task-${task._id}`}
                        defaultChecked={task.completed}
                        className={"form-checkbox mt-1 h-5 w-5 cursor-pointer"}
                        type="checkbox"
                        onClick={taskToggleHandler} />
                </div>
                <label htmlFor={`task-${task._id}`} className={`flex-1 text-xl cursor-pointer ${task.completed && "text-green-600 line-through"}`}>
                    {task.title} <br/>

                    <span className="text-xs">
                        Dernière mise à jour il y a {window.moment(task.updated_at).fromNow()}
                    </span>
                </label>

                <div className={""}>
                    <button onClick={() => setIsShowModalOpened(true)} className="h-6 w-6 mr-4">
                        <ShowIcon />
                    </button>
                    <button onClick={() => setIsEditModalOpened(true)} className="h-6 w-6 mr-4">
                        <EditIcon />
                    </button>
                    <button onClick={taskRemoveHandler} className={"h-6 w-6"}>
                        <RemoveIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Task)