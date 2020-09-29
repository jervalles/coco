import apiInstance from './ApiService'

const fetchCategories = () => {
  return apiInstance.get(`/api/categories`)
}

export default fetchCategories
