import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFetcher } from '../../../../libs/axios';

const useMutationDeleteCart = () => {
  const queryClient = useQueryClient();

  const uri = '/cart/';

  const { mutate, ...others } = useMutation(
    async (id) => {
      const data = await deleteFetcher(uri + id);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart');
      },
    }
  );

  return { mutate, ...others };
};

export default useMutationDeleteCart;
