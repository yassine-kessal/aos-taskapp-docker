import { AxiosInstance } from "axios"
import {Moment} from "moment";

declare global {
    interface Window {
        axios: AxiosInstance
        moment: Moment
    }
}

window.axios = require('axios')

window.axios.defaults.baseURL = 'https://aos-taskapp.yassinekessal.fr/api' // Put base API URL
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.withCredentials = true;
window.axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

window.moment = require('moment')
window.moment.locale('fr')

export const baseFrontedAppUrl : string = 'https://aos-taskapp.yassinekessal.fr/' // Put base Fronted URL