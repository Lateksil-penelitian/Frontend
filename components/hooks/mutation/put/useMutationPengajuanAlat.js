import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../../libs/axios';

const useMutationPengajuanAlat = ({ id }) => {
  const queryClient = useQueryClient();

  const uri = id ? `/peralatan/pengajuan/${id}` : null;

  const { mutateAsync, ...others } = useMutation(
    async (formData) => {
      const response = await axiosInstance.put(uri, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('peralatan-by-order');
      },
    }
  );

  return { mutateAsync, ...others };
};

export default useMutationPengajuanAlat;
