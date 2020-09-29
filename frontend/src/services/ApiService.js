import axios from 'axios'
import backend from '../../conf'

const apiInstance = axios.create({
  baseURL: backend
})

apiInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authtoken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}` // eslint-disable-line no-param-reassign
    }

    return config
  },

  error => {
    return Promise.reject(error)
  }
)

export default apiInstance
