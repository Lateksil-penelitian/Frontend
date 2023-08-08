import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';
import useToastNotification from '../useToastNotification';

const useMutationCreatePeralatan = () => {
  const queryClient = useQueryClient();
  const showToast = useToastNotification();

  const uri = '/peralatan/create';

  const { mutate, ...others } = useMutation(
    async (formData) => {
      const data = await postFetcher(uri, formData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('peralatan').then(() => {
          showToast('create peralatan successfully', 'success');
        });
      },
    }
  );

  return { mutate, ...others };
};

export default useMutationCreatePeralatan;
