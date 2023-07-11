import API from '@/config/api';
import axios from '@/config/axios';
import { useMutation } from 'react-query';

const createProduct = async (data: any) => {
  const response = await axios.post(API.CREATE_PRODUCT, data);
  return response.data.data;
};

export const useCreateProductMutation = () => {
  return useMutation((data: any) => createProduct(data));
};
