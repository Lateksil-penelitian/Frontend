import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../../libs/axios';

const useRemoteStatusPeralatan = ({ id }) => {
  const uri = id ? `/peralatan/status/${id}` : null;

  const { data, ...others } = useQuery(['peralatan-by-order', id], () =>
    fetcher(uri)
  );

  return { data, ...others };
};

export default useRemoteStatusPeralatan;
