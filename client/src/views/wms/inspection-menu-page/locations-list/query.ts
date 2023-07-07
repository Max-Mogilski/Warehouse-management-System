import API from '@/config/api';
import axios from '@/config/axios';
import { useQuery } from 'react-query';

export const queryKeys = {
  locations: ['locations'],
  locationsLists: () => [...queryKeys.locations, 'list'],
  locationsList: (params: unknown) => [
    ...queryKeys.locationsLists(),
    { params },
  ],
};

const fetchLocations = async (params?: unknown) => {
  const response = await axios.get(API.GET_ALL_LOCATIONS, { params: params });
  return response.data.data;
};

export const useLocationsQuery = (params?: unknown) =>
  useQuery({
    queryKey: queryKeys.locationsList(params),
    queryFn: () => fetchLocations(params),
    keepPreviousData: true,
  });
