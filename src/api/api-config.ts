import axios from 'axios'

const token = () =>
  localStorage.getItem('@')
    ? JSON.parse(localStorage.getItem('@') as string)['#####']
    : null

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const requestHeader = {
  Authorization: '' as string
}

if (token()) {
  requestHeader['Authorization'] = `Bearer ${token()}`
}

const config = {
  baseURL: `${apiBaseUrl}/api/`,
  headers: requestHeader
}

export const request = axios.create(config)
