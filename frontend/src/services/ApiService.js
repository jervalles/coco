import axios from 'axios'

const apiInstance = axios.create({
    baseURL: `http://localhost:5050`
  })

  apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authtoken')
      console.log("3")
      console.log("TEST AUTH TOKEN")
      console.log(token)
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