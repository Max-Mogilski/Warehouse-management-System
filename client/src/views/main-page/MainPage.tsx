import MenuButtonProps from '@/components/shared/menu-button/types';
import MenuList from '@/components/shared/menu-list/MenuList';

const options: MenuButtonProps[] = [
  { content: 'Shop', path: '/shop' },
  { content: 'CMS', path: '/cms/auth' },
];

const MainPage = () => <MenuList options={options} />;

export default MainPage;
