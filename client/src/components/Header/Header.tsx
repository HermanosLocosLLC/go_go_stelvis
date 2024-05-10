import { GiHamburgerMenu } from 'react-icons/gi'
import { FaUser } from 'react-icons/fa'

import styles from './Header.module.scss'
import { RootState } from '../../store/store'
import {
  clearAlert,
  showAlert,
  startLoading,
  stopLoading,
  toggleSideNavbar,
} from '../../store/appReducer/appReducer'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authFetch } from '../../utils/authFetch'
import { logoutUser } from '../../store/userReducer/userReducer'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.user)
  const navigate = useNavigate()

  const handleNavToLogin = () => {
    setShowUserMenu(false)
    navigate('/login')
  }

  const handleLogout = async () => {
    dispatch(startLoading())
    try {
      await authFetch.post('/logout')
      setShowUserMenu(false)
      dispatch(logoutUser())
    } catch (err) {
      dispatch(
        showAlert({
          alertMessage: 'Something went wrong',
          alertType: 'danger',
        }),
      )
      setTimeout(() => {
        dispatch(clearAlert())
      }, 2500)
    }
    dispatch(stopLoading())
  }

  const userMenuBtn = (clickHandler: () => void, text: string) => {
    return (
      <button onClick={clickHandler} className={styles.userMenuLink}>
        {text}
      </button>
    )
  }

  return (
    <header className={styles.headerContainer}>
      {user.email ? (
        <div
          className={`${styles.headerIcon} ${styles.headerBurgerIcon}`}
          onClick={() => dispatch(toggleSideNavbar())}
        >
          <GiHamburgerMenu />
        </div>
      ) : (
        <div></div>
      )}

      <div
        className={`${styles.headerIcon} ${
          !user.pfp ? styles.headerAccountIcon : styles.headerAccountPfp
        }`}
        title='Login/Signup'
        onClick={() => setShowUserMenu(!showUserMenu)}
      >
        {!user.pfp ? (
          <FaUser />
        ) : (
          <img className={styles.pfp} src={user.pfp} alt='profile picture' />
        )}
      </div>
      {showUserMenu && (
        <div className={styles.userMenu}>
          {!user.email && userMenuBtn(handleNavToLogin, 'Login / Signup')}
          {user.email && userMenuBtn(handleLogout, 'Logout')}
        </div>
      )}
    </header>
  )
}

export default Header
