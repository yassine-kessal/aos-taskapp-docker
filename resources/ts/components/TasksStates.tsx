import React, {useCallback, useEffect, useState} from "react"
import {TasksStatesPropsInterface, TaskType} from "../types"

const TasksStates : React.FC<TasksStatesPropsInterface> = ({ tasks, completedFilter, setCompletedFilter }) => {
    const [tasksStates, setTasksStates] = useState<{ all: number, done: number, todo: number }>({
        all: 0,
        done: 0,
        todo: 0
    })

    useEffect(() => {
        setTasksStates({
            all: tasks.length,
            done: tasks.filter(task => task.completed).length,
            todo: tasks.filter(task => !task.completed).length
        })
    }, [tasks])

    const handleClick = useCallback((e, filter: string = "all") => {
        setCompletedFilter(filter)
    }, [tasks])

    return (
        <>
            <a onClick={handleClick} href={"#"} className={`mr-3 ${completedFilter === "all" && "text-red-500"}`}>Tout ({tasksStates.all})</a>
            <a onClick={e => handleClick(e, "completed")} href={"#"} className={`mr-3 ${completedFilter === "completed" && "text-red-500"}`}>Faits ({tasksStates.done})</a>
            <a onClick={e => handleClick(e, "todo")} href={"#"} className={`${completedFilter === "todo" && "text-red-500"}`}>A Faire ({tasksStates.todo})</a>
        </>
    )
}

export default TasksStates