import { AxiosInstance } from "axios"
import {Moment} from "moment";

declare global {
    interface Window {
        axios: AxiosInstance
        moment: Moment
    }
}

window.axios = require('axios')

window.axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.withCredentials = true;
window.axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

window.moment = require('moment')
window.moment.locale('fr')

export const baseFrontedAppUrl : string = 'http://127.0.0.1:8000/'