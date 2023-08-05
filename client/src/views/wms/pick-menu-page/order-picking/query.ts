import { useMutation, useQuery } from 'react-query';
import axios from '@/config/axios';
import API from '@/config/api';

const fetchTaskStatus = async () => {
  const response = await axios.get(API.GET_TASK_STATUS);
  return response.data.data;
};

export const useTaskStatusQuery = () =>
  useQuery({
    queryKey: 'taskStatus',
    queryFn: () => fetchTaskStatus(),
    keepPreviousData: false,
  });

const assignTask = async () => {
  const response = await axios.post(API.POST_ASSIGN_TASK);
  return response.data;
};

export const useAssignTaskMutation = () => {
  return useMutation(() => assignTask());
};
