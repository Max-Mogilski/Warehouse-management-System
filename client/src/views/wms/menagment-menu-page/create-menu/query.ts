import API from '@/config/api';
import axios from '@/config/axios';
import { useMutation, useQueryClient } from 'react-query';

const createLocation = async () => {
  const response = await axios.post(API.CREATE_LOCATION);
  return response.data.data;
};

export const useCreateLocationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(() => createLocation(), {
    onSuccess: (data) => {
      queryClient.setQueryData('locationCreate', data);
    },
  });
};
