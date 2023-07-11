import API from '@/config/api';
import axios from '@/config/axios';
import { useQuery } from 'react-query';

export const queryKeys = {
  product: [],
};

const fetchProduct = async (id: string) => {
  const response = await axios.get(API.GET_PRODUCT(id));
  return response.data.data;
};

export const useProductQuery = (id: string) =>
  useQuery({
    queryKey: [...queryKeys.product, id],
    queryFn: () => fetchProduct(id),
    keepPreviousData: false,
    enabled: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
