import API from '@/config/api';
import axios from '@/config/axios';
import { useMutation } from 'react-query';

const authenticateUser = async (data: AuthFormData, apiPath: string) => {
  const response = await axios.post(apiPath, data);
  return response.data;
};

export const useAuthenticateUser = (apiPath: string) => {
  return useMutation({
    mutationFn: (data: AuthFormData) => authenticateUser(data, apiPath),
  });
};
