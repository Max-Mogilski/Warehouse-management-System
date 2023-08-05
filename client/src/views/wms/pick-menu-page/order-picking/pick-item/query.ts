import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from '@/config/axios';
import API from '@/config/api';
import { ItemToPick } from './types';

const queryKeys = {
  itemToPick: 'itemToPick',
};

const fetchItemToPick = async () => {
  const response = await axios.get(API.GET_PRODUCT_TO_PICK);
  return response.data.data;
};

export const useItemToPickQuery = () =>
  useQuery({
    queryKey: 'itemToPick',
    queryFn: () => fetchItemToPick(),
    keepPreviousData: false,
  });

const pickItem = async (data: ItemToPick) => {
  const response = await axios.post(API.POST_PICK_ITEM, data);
  return response.data;
};

export const usePickItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ItemToPick) => pickItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.itemToPick });
    },
  });
};
