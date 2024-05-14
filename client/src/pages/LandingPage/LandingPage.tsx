import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useRedux'

import styles from './LandingPage.module.scss'

const LandingPage = () => {
  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user.email) {
      navigate('/')
    }
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
