import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../../libs/axios';

const useMutationTahapPengerjaanToDone = () => {
  const queryClient = useQueryClient();

  const uri = '/status/to_done_pemesanan';

  async function updateData({ formData }) {
    const response = await axiosInstance.put(uri, formData);
    return response.data;
  }

  const { mutateAsync, ...others } = useMutation(updateData, {
    onSuccess: () => {
      queryClient.invalidateQueries('selesai-pemesanan');
    },
  });

  return { mutateAsync, ...others };
};

export default useMutationTahapPengerjaanToDone;
