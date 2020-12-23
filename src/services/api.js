import axios from 'axios'

const api = axios.create({
    baseURL: 'https://sigasys.com.br/portal/'
})

export default api