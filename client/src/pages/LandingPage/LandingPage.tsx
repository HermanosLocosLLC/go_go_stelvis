import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './LandingPage.module.scss'
import { AxiosError } from 'axios'
import { authFetch } from '../../utils/authFetch'

type Props = {}

const LandingPage = (props: Props) => {
  const [login, setLogin] = useState<boolean>(true)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

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
      const response = await authFetch.post(`/${endpoint}`, {
        email,
        password,
      })
      console.log(response)
    } catch (err) {
      if (err instanceof AxiosError) console.log(err.response?.data.message)
      else console.log(err)
    }
  }

  const startGoogleAuth = async () => {
    try {
      const response = await authFetch.post('/google/auth')
    } catch (err) {
      console.log(err)
    }
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
        <a href='https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&response_type=code&client_id=967020353266-ebsj9vrcf4cgij7mjb5rv8uog4kpfuil.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fv1%2Fauth%2Fgoogle%2Flogin'>
          Login with Google
        </a>
      </form>
    </main>
  )
}

export default LandingPage
