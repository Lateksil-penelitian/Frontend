import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../../libs/axios';

const useRemoteMethodTransaction = () => {
  const uri = '/method_transaction';

  const { data, ...others } = useQuery(['method_transaction'], () =>
    fetcher(uri)
  );

  return { data, ...others };
};

export default useRemoteMethodTransaction;
