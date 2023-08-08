import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../../libs/axios';

const useRemoteTeknisibyOrderId = ({ id }) => {
  const uri = id ? `/teknisi_in_order/${id}` : null;

  const { data, ...others } = useQuery(['teknisi-by-order', id], () =>
    fetcher(uri)
  );

  return { data, ...others };
};

export default useRemoteTeknisibyOrderId;
