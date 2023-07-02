import API from '@/config/api';
import axios from '@/config/axios';
import { useMutation, useQueryClient } from 'react-query';
import { Order } from './types';

const placeOrder = async (data: Order) => {
  const response = await axios.post(API.CREATE_ORDER, data);
  return response.data;
};

export const usePlaceOrder = (invalidateQueryKey: string[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Order) => placeOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
    },
  });
};
