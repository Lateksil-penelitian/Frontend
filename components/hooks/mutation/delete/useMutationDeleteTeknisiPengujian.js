import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFetcher } from '../../../../libs/axios';

const useMutationDeleteTeknisiPengujian = () => {
  const queryClient = useQueryClient();

  const uri = '/teknisi/';

  const { mutateAsync, ...others } = useMutation(
    async (id) => {
      const data = await deleteFetcher(uri + id);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('teknisi-by-order');
      },
    }
  );

  return { mutateAsync, ...others };
};

export default useMutationDeleteTeknisiPengujian;
