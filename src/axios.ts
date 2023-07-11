import axios from 'axios'

const API_URL = 'https://backend-easyjob-api.onrender.com/'

const api = axios.create({
  baseURL: API_URL,
})

export default api
