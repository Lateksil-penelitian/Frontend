import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';
import useToastNotification from '../useToastNotification';

const useMutationCreateCategories = () => {
  const queryClient = useQueryClient();
  const showToast = useToastNotification();

  const uri = '/category/create';

  const { mutate, ...others } = useMutation(
    async (formData) => {
      const data = await postFetcher(uri, formData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories').then(() => {
          showToast('create data successfully', 'success');
        });
      },
    }
  );

  return { mutate, ...others };
};

export default useMutationCreateCategories;
