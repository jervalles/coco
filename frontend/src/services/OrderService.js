import apiInstance from './ApiService'

export const fetchOrders = () => {
  return apiInstance.get('/api/orders')
}

export const postOrder = orders => {
  return apiInstance.post('/api/orders', orders)
}

export const toArchiveOrder = orderId => {
  return apiInstance.put(`/api/orders/${orderId}`)
}
