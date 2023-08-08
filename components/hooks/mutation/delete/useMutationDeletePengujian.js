import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFetcher } from '../../../../libs/axios';

const useMutationDeletePengujian = () => {
  const queryClient = useQueryClient();

  const uri = '/pengujian/';

  const { mutate, ...others } = useMutation(
    async (id) => {
      const data = await deleteFetcher(uri + id);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
      },
    }
  );

  return { mutate, ...others };
};

export default useMutationDeletePengujian;
