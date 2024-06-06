import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Protected from './pages/Protected/Protected';
import HomePage from './pages/HomePage/HomePage';
import AccountPage from './pages/AccountPage/AccountPage';
import { useEffect } from 'react';
import { getCurrentUser } from './store/userReducer/userReducer';
import Loading from './components/Loading/Loading';
import Alert from './components/Alert/Alert';
import LoginPage from './pages/LoginPage/LoginPage';
import Header from './components/Header/Header';
import SideNavbar from './components/SideNavbar/SideNavbar';
import { useAppDispatch, useAppSelector } from './hooks/useRedux';
import { nanoid } from '@reduxjs/toolkit';

function App() {
  const {
    isLoading,
    isAlert,
    alertMessage,
    alertType,
    sideNavbarOpen,
    errors,
  } = useAppSelector((state) => state.app);

  const { loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      {sideNavbarOpen !== 'default' && <SideNavbar />}
      {(isLoading || loading === 'pending') && <Loading />}
      {isAlert && <Alert message={alertMessage} type={alertType} />}
      {errors.length > 0 &&
        errors.map((err) => (
          <Alert key={nanoid()} message={err.message} type='danger' />
        ))}
      <Routes>
        <Route path='/' element={<Protected />}>
          <Route index element={<HomePage />} />
          <Route path='account' element={<AccountPage />} />
        </Route>
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
