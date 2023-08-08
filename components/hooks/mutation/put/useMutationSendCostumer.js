import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../../libs/axios';

const useMutationSendCostumer = () => {
  const queryClient = useQueryClient();

  const uri = '/send_costumer';

  async function updateData({ formData }) {
    const response = await axiosInstance.put(uri, formData);
    return response.data;
  }

  const { mutate, ...others } = useMutation(updateData, {
    onSuccess: () => {
      queryClient.invalidateQueries('order');
    },
  });

  return { mutate, ...others };
};

export default useMutationSendCostumer;
