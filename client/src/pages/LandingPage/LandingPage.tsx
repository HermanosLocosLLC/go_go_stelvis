import { useEffect } from 'react'
// import styles from './LandingPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useRedux'

const LandingPage = () => {
  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user.email) {
      navigate('/')
    }
    // eslint-disable-next-line
  }, [user])

  return (
    // <main className={styles.landingPage} data-testid='container'>
    <main data-testid='container'>
      <p>Landing Page</p>
      <p>Landing Page</p>
      <p>Landing Page</p>
      <p>Landing Page</p>
    </main>
  )
}

export default LandingPage
