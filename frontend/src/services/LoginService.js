import apiInstance from './ApiService'

export const loginService = (email, password) => {
    console.log("service entered")
    return apiInstance.post('/api/users/login', {email: email, password: password})
}
