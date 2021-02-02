import {useCallback, useState} from "react"
import { AxiosRequestConfig } from "axios"
import {useTheme} from "./context/theme-context";

/**
 * useRequest hooks (for axios api)
 *
 * @param params
 * @return {data, loading, setData, setErrors, exec, errors}
 */
export const useRequest = (params: AxiosRequestConfig) => {
    const theme = useTheme()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [errors, setErrors] = useState([])

    /**
     * Exec callback function
     *
     * @param execParams
     * @param onSucces
     * @param onFail
     */
    const exec = useCallback(async (execParams?: AxiosRequestConfig,  onSucces?: CallableFunction, onFail?:CallableFunction) => {
        theme.enableLoading()
        setLoading(true)

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

        theme.disableLoading()
        setLoading(false)
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

/**
 * Fetch list tasks request
 */
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