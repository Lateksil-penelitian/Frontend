import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../libs/axios';

const useMutationAddResultPengujian = () => {
  const queryClient = useQueryClient();

  const uri = '/order/upload-result';

  const { mutateAsync, ...others } = useMutation(
    async (formData) => {
      const response = await axiosInstance.post(uri, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('payment');
      },
    }
  );

  return { mutateAsync, ...others };
};

export default useMutationAddResultPengujian;
