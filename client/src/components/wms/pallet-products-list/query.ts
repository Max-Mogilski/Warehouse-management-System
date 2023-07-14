import API from '@/config/api';
import axios from '@/config/axios';
import { useQuery } from 'react-query';

export const queryKeys = {
  palletProducts: [],
};

const fetchPalletProducts = async (id: string) => {
  const response = await axios.get(API.GET_PALLET_PRODUCTS(id));
  return response.data.data;
};

export const usePalletProductsQuery = (id: string) =>
  useQuery({
    queryKey: [...queryKeys.palletProducts, `products-${id}`],
    queryFn: () => fetchPalletProducts(id),
    keepPreviousData: false,
    enabled: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
