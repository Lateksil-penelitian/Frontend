import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../../libs/axios';

const useMutationProsesToTahapPengujian = () => {
  const queryClient = useQueryClient();

  const uri = '/to_tahap_pengujian';

  async function updateData({ formData }) {
    const response = await axiosInstance.put(uri, formData);
    return response.data;
  }

  const { mutate, ...others } = useMutation(updateData, {
    onSuccess: () => {
      queryClient.invalidateQueries('proses-pengujian');
    },
  });

  return { mutate, ...others };
};

export default useMutationProsesToTahapPengujian;
