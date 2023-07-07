import API from '@/config/api';
import axios from '@/config/axios';
import { useQuery } from 'react-query';

export const queryKeys = {
  location: ['locationCreate'],
};

const fetchLocation = async (id: string) => {
  const response = await axios.get(API.GET_LOCATION(id));
  return response.data.data;
};

export const useLocationQuery = (id: string) =>
  useQuery({
    queryKey: [...queryKeys.location, id],
    queryFn: () => fetchLocation(id),
    keepPreviousData: false,
    enabled: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
