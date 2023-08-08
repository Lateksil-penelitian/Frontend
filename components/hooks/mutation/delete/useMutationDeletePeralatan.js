import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFetcher } from '../../../../libs/axios';

const useMutationDeletePeralatan = () => {
  const queryClient = useQueryClient();

  const uri = '/peralatan/';

  const { mutateAsync, ...others } = useMutation(
    async (id) => {
      const data = await deleteFetcher(uri + id);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('peralatan');
      },
    }
  );

  return { mutateAsync, ...others };
};

export default useMutationDeletePeralatan;
