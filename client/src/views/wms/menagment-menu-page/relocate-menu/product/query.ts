import API from '@/config/api';
import axios from '@/config/axios';
import { useMutation } from 'react-query';
import { RelocateProductData } from './types';

const relocateProduct = async (data: RelocateProductData) => {
  const response = await axios.post(API.POST_RELOCATE_PRODUCT, data);
  return response.data.data;
};

export const useRelocateProductMutation = () => {
  return useMutation((data: RelocateProductData) => relocateProduct(data));
};
