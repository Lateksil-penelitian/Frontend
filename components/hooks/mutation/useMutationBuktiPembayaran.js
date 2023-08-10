import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../libs/axios';

const useMutationBuktiPembayaran = () => {
  const queryClient = useQueryClient();

  const uri = '/upload-payment/create';

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

export default useMutationBuktiPembayaran;
