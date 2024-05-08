import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import Protected from './pages/Protected/Protected'
import HomePage from './pages/HomePage/HomePage'
import AccountPage from './pages/AccountPage/AccountPage'
import { useEffect } from 'react'
import { getCurrentUser } from './store/userReducer/userReducer'
import Loading from './components/Loading/Loading'
import Alert from './components/Alert/Alert'
import LoginPage from './pages/LoginPage/LoginPage'
import Header from './components/Header/Header'
import SideNavbar from './components/SideNavbar/SideNavbar'
import { useAppDispatch, useAppSelector } from './hooks/useRedux'

function App() {
  const { isLoading, isAlert, alertMessage, alertType, sideNavbarOpen } =
    useAppSelector((state) => state.app)
  const { loading } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const checkUser = async () => {
    try {
      const result = await dispatch(getCurrentUser()).unwrap()
      console.log('Get Current User Result', result)
    } catch (err) {
      console.log('getCurrentUser Error:', err)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <>
      <Header />
      {sideNavbarOpen !== 'default' && <SideNavbar />}
      {(isLoading || loading === 'pending') && <Loading />}
      {isAlert && <Alert message={alertMessage} type={alertType} />}
      <Routes>
        <Route path='/' element={<Protected />}>
          <Route index element={<HomePage />} />
          <Route path='account' element={<AccountPage />} />
        </Route>
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
