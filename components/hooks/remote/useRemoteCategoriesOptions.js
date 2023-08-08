import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemoteCategoriesOptions = () => {
  const uri = `/categories/client`;

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

  const newData = data?.data?.map((item) => ({
    label: item.name_category,
    value: item.name_category,
  }));

  return { data: newData, ...others };
};

export default useRemoteCategoriesOptions;
