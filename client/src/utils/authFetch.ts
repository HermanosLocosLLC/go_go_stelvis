import axios, { AxiosError } from 'axios'

const vAuthFetch = axios.create({
  baseURL: 'http://localhost:3000/api/v1/v-auth',
  withCredentials: true,
})

vAuthFetch.interceptors.response.use(
  (response) => {
    return response
  },
  (err: AxiosError) => {
    console.log(err.response)
    // console.log(err)
    if (err.response?.status === 401) {
      // TODO
      // logoutUser()
    }
    return Promise.reject(err)
  },
)

export { vAuthFetch }
