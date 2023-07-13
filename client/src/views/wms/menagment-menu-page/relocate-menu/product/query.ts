import API from '@/config/api';
import axios from '@/config/axios';
import { useMutation } from 'react-query';

const relocateProduct = async (data: any) => {
  const response = await axios.post(API.POST_RELOCATE_PRODUCT, data);
  return response.data.data;
};

export const useRelocateProductMutation = () => {
  return useMutation((data: any) => relocateProduct(data));
};
