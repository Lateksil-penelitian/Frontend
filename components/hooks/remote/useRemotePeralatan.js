import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemotePeralatan = ({ page = 1, limit = 10 }) => {
  const uri = `/peralatan`;

  const { data, ...others } = useQuery(['peralatan', page, limit], () =>
    postFetcher(uri, {
      page,
      limit,
    })
  );

  return { data, ...others };
};

export default useRemotePeralatan;
