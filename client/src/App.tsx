import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import Protected from './pages/Protected/Protected'
import HomePage from './pages/HomePage/HomePage'
import AccountPage from './pages/AccountPage/AccountPage'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser } from './store/userReducer/userReducer'
import { LoginPayload } from './store/userReducer/userTypes'
import { userFetch } from './utils/userFetch'
import { RootState } from './store/store'
import {
  clearAlert,
  showAlert,
  startLoading,
  stopLoading,
} from './store/appReducer/appReducer'
import Loading from './components/Loading/Loading'
import Alert from './components/Alert/Alert'

function App() {
  const dispatch = useDispatch()
  const { isLoading, isAlert, alertMessage, alertType } = useSelector(
    (state: RootState) => state.app,
  )

  const getCurrentUser = async () => {
    dispatch(startLoading())
    try {
      const response: { data: LoginPayload } = await userFetch('/')
      dispatch(loginUser(response.data))
      dispatch(stopLoading())
    } catch (err) {
      dispatch(stopLoading())
      dispatch(
        showAlert({
          alertMessage: 'Something went wrong',
          alertType: 'danger',
        }),
      )
      dispatch(clearAlert({}))
      dispatch(logoutUser())
    }
  }

  useEffect(() => {
    getCurrentUser()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {isLoading && <Loading />}
      {isAlert && <Alert message={alertMessage} type={alertType} />}
      <Routes>
        <Route path='/' element={<Protected />}>
          <Route index element={<HomePage />} />
          <Route path='account' element={<AccountPage />} />
        </Route>
        <Route path='/landing' element={<LandingPage />} />
      </Routes>
    </>
  )
}

export default App
