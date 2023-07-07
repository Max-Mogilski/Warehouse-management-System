import MenuButtonProps from '@/components/shared/menu-button/types';
import MenuList from '@/components/shared/menu-list/MenuList';

const options: MenuButtonProps[] = [
  { content: 'Inspection', path: '/cms/inspection' },
  { content: 'Menagment', path: '/cms/menagment' },
  { content: 'Pick', path: '/cms/pick' },
];

const MenuPage = () => {
  return <MenuList options={options} />;
};

export default MenuPage;
