import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../../libs/axios';

const useRemoteOrderById = ({ id }) => {
  const uri = id ? `/order/${id}` : null;

  const { data, ...others } = useQuery(['order_id', id], () => fetcher(uri));

  return { data, ...others };
};

export default useRemoteOrderById;
