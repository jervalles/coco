import apiInstance from './ApiService'

export const fetchOrders = () => {
    return apiInstance.get('/api/orders')
}

export const postOrder = (orders) => {
    return apiInstance.post('/api/orders', orders)
}

export const destroyOrder = (orderId) => {
    return apiInstance.delete(`/api/orders/${orderId}`)
}