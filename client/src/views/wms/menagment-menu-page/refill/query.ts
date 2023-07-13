import API from '@/config/api';
import axios from '@/config/axios';
import { useMutation } from 'react-query';
import { RefilProductData } from './types';

const refillProduct = async (data: RefilProductData) => {
  const response = await axios.post(API.POST_REFILL_PRODUCT, data);
  return response.data.data;
};

export const useRefillProductMutation = () => {
  return useMutation((data: RefilProductData) => refillProduct(data));
};
