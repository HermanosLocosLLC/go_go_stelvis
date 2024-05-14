import axios, { AxiosError } from 'axios'

const userFetch = axios.create({
  baseURL: '/api/v1/user',
  // baseURL: 'http://localhost:3000/api/v1/user',
  withCredentials: true,
})

userFetch.interceptors.response.use(
  (response) => {
    return response
  },
  (err: AxiosError) => {
    // console.log(err.response)
    // console.log(err)
    if (err.response?.status === 401) {
      // TODO
      // logoutUser()
    }
    return Promise.reject(err)
  },
)

export { userFetch }
