import MenuButtonProps from '@/components/shared/menu-button/types';
import MenuList from '@/components/shared/menu-list/MenuList';
import { useEffect, useState } from 'react';
import { dynamicListProps } from './types';

const DynamicList = ({ queryFn, optionsFn }: dynamicListProps) => {
  const [options, setOptions] = useState<MenuButtonProps[] | null>(null);
  const { data, isLoading } = queryFn();

  useEffect(() => {
    if (data) {
      const formatedOptions = optionsFn(data);
      setOptions(formatedOptions);
    }
  }, [data]);

  return <MenuList isLoading={isLoading} options={options} />;
};

export default DynamicList;
