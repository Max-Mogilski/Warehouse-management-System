import API from '@/config/api';
import axios from '@/config/axios';

export const test = async () => {
  const response = await axios.get(API.TEST, {
    withCredentials: true,
  });
  return response.data;
};
