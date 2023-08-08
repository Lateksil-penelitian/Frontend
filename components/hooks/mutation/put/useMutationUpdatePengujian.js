import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../../libs/axios';

const useMutationUpdatePengujian = () => {
  const queryClient = useQueryClient();

  const uri = '/pengujian/';

  async function updateData({ id, formData }) {
    const response = await axiosInstance.put(uri + id, formData);
    return response.data;
  }

  const { mutate, ...others } = useMutation(updateData, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    },
  });

  return { mutate, ...others };
};

export default useMutationUpdatePengujian;
