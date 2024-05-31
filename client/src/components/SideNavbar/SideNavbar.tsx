import { Link } from 'react-router-dom';
import styles from './SideNavbar.module.scss';
import { RootState } from '../../store/store';
import { toggleSideNavbar } from '../../store/appReducer/appReducer';
import gogoLogo from '../../assets/travel-icon-noBg.png';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

const SideNavbar = () => {
  const { sideNavbarOpen } = useAppSelector((state: RootState) => state.app);
  const dispatch = useAppDispatch();

  return (
    <>
      <div
        className={`${styles.sideNavbarContainer} ${
          sideNavbarOpen ? styles.sideNavbarOpen : styles.sideNavbarClose
        }`}
      >
        <div className={styles.navbarLinksContainer}>
          <Link to={'/'} className={styles.navbarLink}>
            Explore
          </Link>
          <Link to={'/'} className={styles.navbarLink}>
            My Trips
          </Link>
          <Link to={'/'} className={styles.navbarLink}>
            Blogs
          </Link>
        </div>
        <div className={styles.navbarLogoContainer}>
          <img src={gogoLogo} alt='logo' className={styles.navbarLogo} />
          <p className={styles.navbarLogoCopy}>©Go Go Stelvis 2024</p>
        </div>
      </div>
      {sideNavbarOpen && (
        <div
          className={styles.sideNavbarCloser}
          onClick={() => dispatch(toggleSideNavbar({ type: 'close' }))}
        ></div>
      )}
    </>
  );
};

export default SideNavbar;
