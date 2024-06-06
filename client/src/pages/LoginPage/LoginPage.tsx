import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './LoginPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/userReducer/userReducer';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { clearErrors, setErrors } from '../../store/appReducer/appReducer';
import { SerializedError } from '../../types/serializedError';
import { FcGoogle } from 'react-icons/fc';
import { googleOAuthUrl } from '../../utils/config';

const LoginPage = () => {
  const [login, setLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.email) {
      console.log('Navigating to Home');
      navigate('/');
    }
    // eslint-disable-next-line
  }, [user]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value || '');
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('HandleSubmit');

    try {
      const result = await dispatch(
        loginUser({ login, email, password }),
      ).unwrap();
      console.log('Result:', result);
    } catch (err) {
      dispatch(setErrors(err as SerializedError[]));
      setEmail('');
      setPassword('');
      setTimeout(() => {
        dispatch(clearErrors());
      }, 2500);
    }
  };

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
            setEmail('');
            setPassword('');
            setLogin(!login);
          }}
        >
          {login ? 'Not a member? Sign up' : 'Already a member? Login'}
        </p>
        <a href={googleOAuthUrl} className={styles.googleOAuthLink}>
          <FcGoogle />
        </a>
      </form>
    </main>
  );
};

export default LoginPage;
