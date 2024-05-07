import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import styles from './LoginPage.module.scss'
import { AxiosError } from 'axios'
import { authFetch } from '../../utils/authFetch'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import { LoginPayload } from '../../store/userReducer/userTypes'
import { loginUser } from '../../store/userReducer/userReducer'
import { clearAlert, showAlert } from '../../store/appReducer/appReducer'

const LoginPage = () => {
  const [login, setLogin] = useState<boolean>(true)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const user = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (user.email) {
      console.log('Navigating to Home')
      navigate('/')
    }
    // eslint-disable-next-line
  }, [user])

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value || '')
  }
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) return
    const endpoint = login ? 'gogo/login' : 'gogo/signup'

    try {
      const response: { data: LoginPayload } = await authFetch.post(
        `/${endpoint}`,
        {
          email,
          password,
        },
      )
      dispatch(
        showAlert({
          alertType: 'success',
          alertMessage: `${login ? 'Login' : 'Signup'} successful`,
        }),
      )
      dispatch(loginUser(response.data))
    } catch (err) {
      if (err instanceof AxiosError) {
        dispatch(
          showAlert({
            alertType: 'danger',
            alertMessage:
              err.response?.data[0].message || 'Something went wrong',
          }),
        )
      } else {
        dispatch(
          showAlert({
            alertType: 'danger',
            alertMessage: 'Something went wrong',
          }),
        )
      }
    }
    setEmail('')
    setPassword('')
    setTimeout(() => {
      dispatch(clearAlert())
    }, 3000)
  }

  return (
    <main className={styles.page}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <label htmlFor='email' className={styles.label}>
          EMAIL
        </label>
        <input
          name='email'
          type='email'
          value={email}
          onChange={(e) => handleEmailChange(e)}
          className={styles.input}
        />
        <label htmlFor='password' className={styles.label}>
          PASSWORD
        </label>
        <input
          name='password'
          type='password'
          value={password}
          onChange={(e) => handlePasswordChange(e)}
          className={styles.input}
        />
        <button type='submit' className={styles.btn}>
          {login ? 'Login' : 'Sign Up'}
        </button>
        <p
          onClick={() => {
            setEmail('')
            setPassword('')
            setLogin(!login)
          }}
        >
          {login ? 'Not a member? Sign up' : 'Already a member? Login'}
        </p>
        <a href='https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&response_type=code&client_id=967020353266-ebsj9vrcf4cgij7mjb5rv8uog4kpfuil.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fv1%2Fauth%2Fgoogle%2Flogin'>
          Login with Google
        </a>
      </form>
    </main>
  )
}

export default LoginPage
