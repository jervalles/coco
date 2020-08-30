import apiInstance from './ApiService'

export const fetchItems = () => {
    return apiInstance.get('/api/items')
}
