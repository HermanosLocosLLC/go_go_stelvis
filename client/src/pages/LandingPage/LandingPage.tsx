import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './LandingPage.module.scss'
import { AxiosError } from 'axios'
import { vAuthFetch } from '../../utils/authFetch'

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

    try {
      const response = await vAuthFetch.post('/', {
        email,
        password,
      })
      console.log(response)
    } catch (err) {
      if (err instanceof AxiosError) console.log(err.response?.data.message)
      else console.log(err)
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
      </form>
    </main>
  )
}

export default LandingPage
