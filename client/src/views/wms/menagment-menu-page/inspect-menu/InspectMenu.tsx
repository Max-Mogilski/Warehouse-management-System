import MenuButtonProps from '@/components/shared/menu-button/types';
import MenuList from '@/components/shared/menu-list/MenuList';

const options: MenuButtonProps[] = [
  { content: 'Product', path: '/cms/menagment/inspect/product' },
  { content: 'Location', path: '/cms/menagment/inspect/location' },
  { content: 'Pallet', path: '/cms/menagment/inspect/pallet', disabled: true },
];

const InspectMenu = () => {
  return <MenuList options={options} />;
};

export default InspectMenu;
