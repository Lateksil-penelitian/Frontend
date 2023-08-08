import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemoteCostumer = ({ page, limit, isActive, search }) => {
  const uri = `/users`;

  const { data, ...others } = useQuery(
    ['users', page, page, isActive, search],
    () =>
      postFetcher(uri, {
        page,
        limit,
        search,
        filter: {
          isActive_payment: isActive,
        },
      })
  );

  return { data, ...others };
};

export default useRemoteCostumer;
