import axios, { AxiosError } from 'axios'

const authFetch = axios.create({
  baseURL: 'http://localhost:3000/api/v1/auth',
  withCredentials: true,
})

authFetch.interceptors.response.use(
  (response) => {
    return response
  },
  (err: AxiosError) => {
    if (err.response?.status === 401) {
      // TODO
      // const dispatch = useAppDispatch()
      // dispatch(logoutUser())
    }
    return Promise.reject(err)
  },
)

export { authFetch }
