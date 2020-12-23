import axios from 'axios'

const apiOneSignal = axios.create({
    baseURL: 'https://onesignal.com/api/v1/'
})

export default apiOneSignal