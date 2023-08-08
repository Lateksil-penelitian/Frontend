import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../libs/axios';
import useToastNotification from '../useToastNotification';

const useMutationCreatePengujian = () => {
  const queryClient = useQueryClient();
  const showToast = useToastNotification();

  const uri = '/pengujian/create';

  const { mutate, ...others } = useMutation(
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
        queryClient.invalidateQueries('pengujian').then(() => {
          showToast('Berhasil Menambahkan Pengujian', 'success');
        });
      },
    }
  );

  return { mutate, ...others };
};

export default useMutationCreatePengujian;
