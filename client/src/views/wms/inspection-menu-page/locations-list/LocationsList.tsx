import { useLocationsQuery } from './query';
import DynamicList from '@/components/wms/dynamic-list/DynamicList';

const getComponentOptions = (data: any[]) => {
  const formatedOptions = [];
  for (let i = 0; i < data.length; i++) {
    formatedOptions.push({
      content: `Location ${i + 1}`,
      path: `/cms/inspection/locations/${data[i].id}`,
    });
  }
  return formatedOptions;
};

const LocationsList = () => (
  <DynamicList queryFn={useLocationsQuery} optionsFn={getComponentOptions} />
);

export default LocationsList;
