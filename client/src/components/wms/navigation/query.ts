import API from '@/config/api';
import axios from '@/config/axios';
import { useMutation } from 'react-query';

const logoutUser = async () => {
  const response = await axios.delete(API.LOGOUT_USER);
  return response.data;
};

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: () => logoutUser(),
  });
};
