import apiInstance from './ApiService'

export const fetchOrders = () => {
    return apiInstance.get('/api/orders')
}

export const postOrder = (order) => {
    return apiInstance.post('/api/orders', order)
}
