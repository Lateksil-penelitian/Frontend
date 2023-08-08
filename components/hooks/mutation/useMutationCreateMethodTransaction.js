import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';
import useToastNotification from '../useToastNotification';

const useMutationCreateMethodTransaction = () => {
  const queryClient = useQueryClient();
  const showToast = useToastNotification();

  const uri = '/method_transaction/create';

  const { mutateAsync, ...others } = useMutation(
    async (formData) => {
      const data = await postFetcher(uri, formData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('method_transaction-all').then(() => {
          showToast('Berhasil Menambahkan', 'success');
        });
      },
    }
  );

  return { mutateAsync, ...others };
};

export default useMutationCreateMethodTransaction;
