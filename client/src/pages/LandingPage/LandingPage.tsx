import { useEffect } from 'react'
import styles from './LandingPage.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const user = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user.email) {
      navigate('/')
    }
    // eslint-disable-next-line
  }, [user])

  return (
    <main className={styles.landingPage}>
      <p>Landing Page</p>
      <p>Landing Page</p>
      <p>Landing Page</p>
      <p>Landing Page</p>
    </main>
  )
}

export default LandingPage
