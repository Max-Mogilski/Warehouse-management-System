import MenuButtonProps from '@/components/shared/menu-button/types';
import MenuList from '@/components/shared/menu-list/MenuList';
import { useCreateLocationMutation } from './query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CreateMenu = () => {
  const createMutation = useCreateLocationMutation();
  const navigate = useNavigate();

  const handleCreateLocation = () => {
    createMutation.mutate(undefined, {
      onSuccess: (data) => {
        console.log(data);
        navigate(`/cms/inspection/locations/${data?.id}`);
        toast.success('Location created!');
      },
    });
  };

  const options: MenuButtonProps[] = [
    {
      content: 'Location',
      onClick: handleCreateLocation,
    },
    { content: 'Pallet', path: '/cms/menagment/create/pallet' },
    { content: 'Product', path: '/cms/menagment/create/product' },
  ];

  return <MenuList options={options} isLoading={createMutation.isLoading} />;
};

export default CreateMenu;
