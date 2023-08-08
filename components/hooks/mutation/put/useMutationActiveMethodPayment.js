import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../../libs/axios';

const useMutationActiveMethodPayment = ({ id }) => {
  const queryClient = useQueryClient();

  const uri = id ? `/method_transaction/${id}` : null;

  async function updateData() {
    const response = await axiosInstance.put(uri);
    return response.data;
  }

  const { mutateAsync, ...others } = useMutation(updateData, {
    onSuccess: () => {
      queryClient.invalidateQueries('method_transaction-all');
    },
  });

  return { mutateAsync, ...others };
};

export default useMutationActiveMethodPayment;
