import API from '@/config/api';
import axios from '@/config/axios';
import { useQuery } from 'react-query';

export const queryKeys = {
  order: [],
};

const fetchOrder = async (id: string) => {
  const response = await axios.get(API.GET_ORDER(id));
  return response.data.data;
};

export const useOrderQuery = (id: string) =>
  useQuery({
    queryKey: [...queryKeys.order, id],
    queryFn: () => fetchOrder(id),
    keepPreviousData: false,
    enabled: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
