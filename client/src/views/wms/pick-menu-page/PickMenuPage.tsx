import MenuButtonProps from '@/components/shared/menu-button/types';
import MenuList from '@/components/shared/menu-list/MenuList';

const options: MenuButtonProps[] = [
  { content: 'Order Picking', path: '/cms/pick/order-picking', disabled: true },
];

const PickMenuPage = () => {
  return <MenuList options={options} previousRoute="/cms" />;
};

export default PickMenuPage;
