import MenuButtonProps from '@/components/shared/menu-button/types';
import MenuList from '@/components/shared/menu-list/MenuList';

const options: MenuButtonProps[] = [
  { content: 'Product', path: '/cms/menagment/relocate/product' },
  { content: 'Pallet', path: '/cms/menagment/relocate/pallet', disabled: true },
];

const RelocateMenu = () => {
  return <MenuList options={options} />;
};

export default RelocateMenu;
