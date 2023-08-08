import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemoteCategoriesClient = () => {
  const uri = `/categories/client`;

  const { data, ...others } = useQuery(['categories'], () =>
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

export default useRemoteCategoriesClient;
