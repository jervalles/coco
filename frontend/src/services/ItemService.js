import apiInstance from './ApiService'

const fetchItems = () => {
  return apiInstance.get('/api/items')
}

export default fetchItems
