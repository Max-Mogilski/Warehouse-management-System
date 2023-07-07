import MenuButtonProps from '@/components/shared/menu-button/types';
import MenuList from '@/components/shared/menu-list/MenuList';

const options: MenuButtonProps[] = [
  { content: 'Orders', path: '/cms/inspection/orders' },
  { content: 'Products', path: '/cms/inspection/orders', disabled: true },
  { content: 'Locations', path: '/cms/inspection/locations' },
  { content: 'Users', path: '/cms/inspection/users', disabled: true },
];

const InspectionMenuPage = () => {
  return <MenuList options={options} />;
};

export default InspectionMenuPage;
