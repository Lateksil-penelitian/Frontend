import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../libs/axios';

const useMutationProgressTaskPengujian = () => {
  const queryClient = useQueryClient();

  const uri = '/teknisi/progress_task';

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
        queryClient.invalidateQueries('teknisi');
      },
    }
  );

  return { mutateAsync, ...others };
};

export default useMutationProgressTaskPengujian;
