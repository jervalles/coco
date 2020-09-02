import apiInstance from './ApiService'

export const fetchOrders = () => {
    return apiInstance.get('/api/orders')
}
