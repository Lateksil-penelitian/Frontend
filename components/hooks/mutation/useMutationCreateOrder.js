import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';
import useToastNotification from '../useToastNotification';

const useMutationCreateOrder = () => {
  const queryClient = useQueryClient();
  const showToast = useToastNotification();

  const uri = '/order/create';

  const { mutateAsync, ...others } = useMutation(
    async (formData) => {
      const data = await postFetcher(uri, formData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('order').then(() => {
          showToast('Berhasil Memesan Pengujian', 'success');
        });
      },
    }
  );

  return { mutateAsync, ...others };
};

export default useMutationCreateOrder;
