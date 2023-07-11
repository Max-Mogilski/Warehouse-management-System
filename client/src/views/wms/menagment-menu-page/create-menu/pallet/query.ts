import API from '@/config/api';
import axios from '@/config/axios';
import { useMutation } from 'react-query';

interface palletData {
  locationId: string;
}

const createPallet = async (data: palletData) => {
  const response = await axios.post(API.CREATE_PALLET, data);
  return response.data.data;
};

export const useCreatePalletMutation = () => {
  return useMutation((data: palletData) => createPallet(data));
};
