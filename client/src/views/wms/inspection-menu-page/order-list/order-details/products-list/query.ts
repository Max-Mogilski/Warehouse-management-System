import API from '@/config/api';
import axios from '@/config/axios';
import { useQuery } from 'react-query';

export const queryKeys = {
  orderProducts: [],
};

const fetchOrderProducts = async (id: string) => {
  const response = await axios.get(API.GET_ORDER_PRODUCTS(id));
  return response.data.data;
};

export const useOrderProductsQuery = (id: string) =>
  useQuery({
    queryKey: [...queryKeys.orderProducts, `products-${id}`],
    queryFn: () => fetchOrderProducts(id),
    keepPreviousData: false,
    enabled: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
