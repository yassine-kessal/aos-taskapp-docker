import React, {useEffect, useState} from 'react'
import Task from "../components/Task"
import {useFetchTasksRequest} from "../hooks"
import {TaskType} from "../types"
import TasksStates from "../components/TasksStates"
import { AnimatedList } from 'react-animated-list'
import AddTaskForm from "../components/AddTaskForm"
import {useToasts} from "react-toast-notifications";

/**
 * Todo page
 *
 * @constructor
 */
const TodoPage : React.FC = () => {
    const {addToast} = useToasts()

    // Active Complete Filter State
    const [completedFilter, setCompletedFilter] = useState<string>("all")

    // Get all tasks request
    const { tasks, execFetchTasks, setTasks, loading } = useFetchTasksRequest()

    useEffect(() => {
        execFetchTasks()
    }, [])

    return (
        <div className={"px-2 py-2 md:px-8 md:py-4 rounded"}>
            <h1 className={"text-3xl"}>AOS TO-DO List</h1>
            
            <div className={"mt-3 flex"}>
                <AddTaskForm tasks={tasks} onTaskAdded={(addedTask: TaskType) => {
                    setTasks((tasks: TaskType[]) => [addedTask, ...tasks])

                    addToast('Tâche ajoutée avec succès', { appearance: 'success' })
                }} />
            </div>

            <div className={"mt-5"}>
                <div className="text-right">
                    <TasksStates tasks={tasks} setCompletedFilter={setCompletedFilter} completedFilter={completedFilter} />
                </div>
                {loading && <span>Chargement...</span>}
                {tasks.length > 0 ?
                    <AnimatedList animation={"grow"}>
                        {tasks.map(task => (
                            <Task
                                completedFilter={completedFilter}
                                key={`task-${task._id}`}
                                task={task}
                                onTaskRemoved={(removedTask: TaskType) => {
                                    setTasks(tasks => tasks.filter((task, index) => task._id !== removedTask._id))
                                    addToast('Tâche supprimée avec succès', { appearance: 'error' })
                                }}
                                onTaskEdited={(editedTask:TaskType) => {
                                    setTasks(tasks => {
                                        let newTasks = [
                                            ...tasks
                                        ]

                                        newTasks[newTasks.indexOf(task)].title = editedTask.title
                                        newTasks[newTasks.indexOf(task)].description = editedTask.description

                                        return newTasks
                                    })

                                    addToast('Tâche modifiée avec succès', { appearance: 'success' })
                                }}
                                onTaskToggle={() => {
                                    setTasks((tasks) => {
                                        const newTasks = [
                                            ...tasks
                                        ]

                                        newTasks[newTasks.indexOf(task)].completed = !newTasks[newTasks.indexOf(task)].completed

                                        return newTasks
                                    })

                                    addToast(
                                        `La tâche "${task.title}" est marquée comme ${task.completed ? "terminée" : "non-terminée"}`,
                                        { appearance: task.completed ? 'success' : 'info' }
                                    )
                                }} />
                        ))}
                    </AnimatedList>
                :  <p>Aucune tâches</p>
                }
            </div>
        </div>
    )
}

export default TodoPage