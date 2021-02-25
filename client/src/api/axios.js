import axios from 'axios'

const api = axios.create({
  baseURL: 'https://e-commerce-cms-server-matthew.herokuapp.com'
})

export default api
