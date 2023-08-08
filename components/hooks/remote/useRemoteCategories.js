import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemoteCategories = () => {
  const uri = `/categories`;

  const { data, ...others } = useQuery(['categories', 1, 10], () =>
    postFetcher(uri, {
      page: 1,
      limit: 30,
      search: '',
      filter: {
        name_category: '',
      },
    })
  );

  return { data, ...others };
};

export default useRemoteCategories;
