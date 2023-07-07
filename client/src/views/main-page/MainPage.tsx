import MenuButtonProps from '@/components/shared/menu-button/types';
import MenuList from '@/components/shared/menu-list/MenuList';
import styles from './MainPage.module.scss';

const options: MenuButtonProps[] = [
  { content: 'Shop', path: '/shop' },
  { content: 'CMS', path: '/cms/auth' },
];

const MainPage = () => (
  <div className={styles.container}>
    <MenuList options={options} />
  </div>
);

export default MainPage;
