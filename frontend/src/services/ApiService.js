import axios from 'axios'
import { backend } from '../../conf.js'

const apiInstance = axios.create({
    baseURL: backend
  })

  apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authtoken')

      if (token) {
        config.headers['Authorization'] = `Bearer ${ token }`
      }
  
      return config
    },
  
    (error) => {
      return Promise.reject(error)
    }
  )
  
  export default apiInstance