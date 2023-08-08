import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemoteMethodTransactionAll = ({ page, limit, search }) => {
  const uri = `/method_transaction/all`;

  const { data, ...others } = useQuery(
    ['method_transaction-all', page, limit, search],
    () =>
      postFetcher(uri, {
        page: page,
        limit: limit,
        search: search,
      })
  );

  return { data, ...others };
};

export default useRemoteMethodTransactionAll;
