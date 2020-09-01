import apiInstance from './ApiService'

export const postUser = (email, password) => {
    return apiInstance.post('/api/users/signup', {email: email, password: password})
}