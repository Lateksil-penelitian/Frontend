import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemotePayment = ({ page, limit, search, accept_payment = '' }) => {
  const uri = `/payment`;

  const { data, ...others } = useQuery(
    ['payment', page, limit, search, accept_payment],
    () =>
      postFetcher(uri, {
        page,
        limit,
        search,
        accept_payment,
      })
  );

  return { data, ...others };
};

export default useRemotePayment;
