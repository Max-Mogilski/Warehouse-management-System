import API from '../../config/api';
import axios from '../../config/axios';
import { useQuery } from 'react-query';

export const queryKeys = {
  products: ['products'],
  productsLists: () => [...queryKeys.products, 'list'],
  productsList: (params: unknown) => [...queryKeys.productsLists(), { params }],
};

const fetchProducts = async (params?: unknown) => {
  const response = await axios.get(API.GET_ALL_PRODUCTS, { params: params });
  return response.data.data;
};

export const useProductsQuery = (params?: unknown) =>
  useQuery({
    queryKey: queryKeys.productsList(params),
    queryFn: () => fetchProducts(params),
    keepPreviousData: true,
  });
