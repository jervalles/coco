import apiInstance from './ApiService'

const postUser = (email, password) => {
  return apiInstance.post('/api/users/signup', {
    email,
    password
  })
}

export default postUser
