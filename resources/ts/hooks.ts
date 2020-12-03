import {useCallback, useState} from "react"
import { AxiosRequestConfig } from "axios"
import {useTheme} from "./context/theme-context";

export const useRequest = (params: AxiosRequestConfig, withControlStates: boolean = true) => {
    const theme = useTheme()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [errors, setErrors] = useState([])

    const exec = useCallback(async (execParams?: AxiosRequestConfig,  onSucces?: CallableFunction, onFail?:CallableFunction) => {
        if(withControlStates)
        {
            theme.enableLoading()
            setLoading(true)
        }

        const authToken = localStorage.getItem('auth-token')

        try {
            let authorizationParams = {}

            if(authToken)
                authorizationParams = {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }

            const result = await window.axios.request({...params, ...execParams, ...authorizationParams})

            setData(result.data)

            if(onSucces)
                onSucces(result.data)
        }
        catch(error) {
            setErrors(error.response.data.errors)
            if(onFail)
                onFail(error.response)

            console.log(error.response)
        }

        if(withControlStates){
            theme.disableLoading()
            setLoading(false)
        }
    }, [params])

    return {
        data,
        loading,
        setData,
        setErrors,
        exec,
        errors
    }
}

export const useFetchTasksRequest = () => {
    const { data: tasks, exec: execFetchTasks, setData: setTasks, loading, errors } = useRequest({
        url: "/task"
    })

    return {
        tasks,
        loading,
        setTasks,
        execFetchTasks,
        errors
    }
}