import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useMutationAddTeknisiPengujian = () => {
  const queryClient = useQueryClient();

  const uri = '/pengujian_teknisi/create';

  const { mutate, ...others } = useMutation(
    async (formData) => {
      const data = await postFetcher(uri, formData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('teknisi-by-order');
      },
    }
  );

  return { mutate, ...others };
};

export default useMutationAddTeknisiPengujian;
