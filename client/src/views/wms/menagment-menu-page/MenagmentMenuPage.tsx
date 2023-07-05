import MenuButtonProps from '@/components/shared/menu-button/types';
import MenuList from '@/components/shared/menu-list/MenuList';

const options: MenuButtonProps[] = [
  { content: 'Create', path: '/cms/menagment/create', disabled: true },
  { content: 'Inspect', path: '/cms/menagment/inspect', disabled: true },
  { content: 'Relocate', path: '/cms/menagment/relocate', disabled: true },
];

const MenagmentMenuPage = () => {
  return <MenuList options={options} previousRoute="/cms" />;
};

export default MenagmentMenuPage;