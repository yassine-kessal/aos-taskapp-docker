import {ChangeEventHandler, MouseEventHandler, ReactElement, ReactNode} from "react";
import Task from "../components/Task";

// ./components/Input
export interface InputPropsInterface {
    id?: string
    type?: string
    placeholder: string
    error?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
    onSubmit?: CallableFunction
    value?: string,
    name: string
}

// ./components/Modal
export interface ModalPropsInterface {
    isOpen?: boolean
    children: ReactElement
}

// ./components/ShowModal
export interface ShowModalPropsInterface {
    isOpen?: boolean
    task: TaskType
    setIsOpen: CallableFunction
    taskRemoveHandler: CallableFunction
}

// ./components/EditModal
export interface EditModalPropsInterface {
    isOpen?: boolean
    task: TaskType
    setIsOpen: CallableFunction
    onTaskEdited: CallableFunction
}

export type editModalErrorsType = object & {title?: string, description?:string}

export type editModalRequestType = {
    errors: editModalErrorsType,
    exec: CallableFunction,
}


// ./components/SubmitButton
export interface SubmitButtonPropsInterface {
    text?: string,
    onClick?: MouseEventHandler
}

// ./components/Task
export type TaskType = {
    "_id": string,
    "title": string,
    "description": string,
    "user_id": string
    "completed": boolean,
    "updated_at": string,
    "created_at": string
}

export interface TaskPropsInterface {
    task: TaskType,
    onTaskRemoved: CallableFunction,
    onTaskToggle: CallableFunction,
    onTaskEdited: CallableFunction,
    completedFilter?: string
}

// ./components/TasksStates
export interface TasksStatesPropsInterface {
    tasks: TaskType[],
    setCompletedFilter: CallableFunction,
    completedFilter: string
}

// ./components/AddTaskForm
export interface AddTaskFormPropsInterface {
    setTasks: CallableFunction
    tasks: TaskType[]
}

// ./pages/TodoPage
export type inputErrorsType = object & {title?:string}

export type inputRequestType = {
    errors: inputErrorsType,
    exec: CallableFunction,
    setErrors: CallableFunction
}

// ./pages/LoginPage
export type loginErrorsType = object & {email?:string, password?: string}

export type loginRequestType = {
    errors: loginErrorsType,
    exec: CallableFunction,
    data?: object
}

// ./pages/RegisterPage
export type registerErrorsType = object & {name?: string, email?:string, password?: string, passwordConfirmation?: string}

export type registerRequestType = {
    errors: registerErrorsType,
    exec: CallableFunction,
}

// ./context/*.tsx
export interface ProviderPropsInterface {
    children: ReactNode
}

export type UserType = {
    _id: string,
    name: string,
    email: string,
    created_at: string,
    updated_at: string,
}