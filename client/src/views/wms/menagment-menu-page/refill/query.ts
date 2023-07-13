import API from '@/config/api';
import axios from '@/config/axios';
import { useMutation } from 'react-query';

const refillProduct = async (data: any) => {
  const response = await axios.post(API.POST_REFILL_PRODUCT, data);
  return response.data.data;
};

export const useRefillProductMutation = () => {
  return useMutation((data: any) => refillProduct(data));
};
