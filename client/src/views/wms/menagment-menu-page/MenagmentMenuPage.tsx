import MenuButtonProps from '@/components/shared/menu-button/types';
import MenuList from '@/components/shared/menu-list/MenuList';

const options: MenuButtonProps[] = [
  { content: 'Create', path: '/cms/menagment/create' },
  { content: 'Inspect', path: '/cms/menagment/inspect' },
  { content: 'Relocate', path: '/cms/menagment/relocate' },
  { content: 'Refill', path: '/cms/menagment/refill' },
];

const MenagmentMenuPage = () => {
  return <MenuList options={options} />;
};

export default MenagmentMenuPage;
