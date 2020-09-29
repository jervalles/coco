import apiInstance from './ApiService'

const loginService = (email, password) => {
  return apiInstance.post('/api/users/login', {
    email,
    password
  })
}

export default loginService
