import DynamicList from '@/components/wms/dynamic-list/DynamicList';
import { useOrdersQuery } from './query';

const getComponentOptions = (data: any[]) => {
  const formatedOptions = [];
  for (let i = 0; i < data.length; i++) {
    formatedOptions.push({
      content: `${i + 1}. Order - ${data[i].status}`,
      path: `/cms/inspection/orders/${data[i].id}`,
    });
  }
  return formatedOptions;
};

const OrderList = () => (
  <DynamicList queryFn={useOrdersQuery} optionsFn={getComponentOptions} />
);

export default OrderList;
