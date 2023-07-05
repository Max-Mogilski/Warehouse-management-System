import MenuButtonProps from '@/components/shared/menu-button/types';
import MenuList from '@/components/shared/menu-list/MenuList';
import { useOrdersQuery } from './query';
import { useEffect, useState } from 'react';

const OrderList = () => {
  const [options, setOptions] = useState<MenuButtonProps[] | null>(null);
  const { data } = useOrdersQuery();

  useEffect(() => {
    if (data) {
      const formatedOptions = [];
      for (let i = 0; i < data.length; i++) {
        formatedOptions.push({
          content: `${i + 1}. Order - ${data[i].status}`,
          path: `/cms/inspection/orders/${data[i].id}`,
        });
      }
      setOptions(formatedOptions);
    }
  }, [data]);

  return <MenuList options={options} previousRoute="/cms/inspection" />;
};

export default OrderList;
