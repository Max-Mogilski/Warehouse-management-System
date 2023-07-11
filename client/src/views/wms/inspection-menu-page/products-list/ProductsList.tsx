import DynamicList from '@/components/wms/dynamic-list/DynamicList';
import { useProductsQuery } from './query';

const getComponentOptions = (data: any[]) => {
  const formatedOptions = [];
  for (let i = 0; i < data.length; i++) {
    formatedOptions.push({
      content: `${data[i].name}`,
      path: `/cms/inspection/products/${data[i].id}`,
    });
  }
  return formatedOptions;
};

const ProductsInspectionList = () => (
  <DynamicList queryFn={useProductsQuery} optionsFn={getComponentOptions} />
);

export default ProductsInspectionList;
