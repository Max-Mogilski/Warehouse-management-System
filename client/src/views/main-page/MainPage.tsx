import MenuButton from '../../components/menu-button/MenuButton';
import styles from './MainPage.module.scss';

const MainPage = () => {
  return (
    <nav className={styles.container}>
      <MenuButton path="/shop" content="Shop" />
      <MenuButton path="/" content="CMS" />
    </nav>
  );
};

export default MainPage;
