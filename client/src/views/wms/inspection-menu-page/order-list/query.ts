import API from '@/config/api';
import axios from '@/config/axios';
import { useQuery } from 'react-query';

export const queryKeys = {
  orders: ['orders'],
  ordersLists: () => [...queryKeys.orders, 'list'],
  ordersList: (params: unknown) => [...queryKeys.ordersLists(), { params }],
};

const fetchOrders = async (params?: unknown) => {
  const response = await axios.get(API.GET_ALL_ORDERS, { params: params });
  return response.data.data;
};

export const useOrdersQuery = (params?: unknown) =>
  useQuery({
    queryKey: queryKeys.ordersList(params),
    queryFn: () => fetchOrders(params),
    keepPreviousData: true,
  });
