import apiInstance from './ApiService'

export const fetchCategories = () => {
    return apiInstance.get(`/api/categories`)
}