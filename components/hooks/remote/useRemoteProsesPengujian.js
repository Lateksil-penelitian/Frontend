import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemoteProsesPengujian = ({ page, limit, search = '' }) => {
  const uri = `/proses-pengujian`;

  const { data, ...others } = useQuery(
    ['proses-pengujian', page, limit, search],
    () =>
      postFetcher(uri, {
        page,
        limit,
        search,
      })
  );

  return { data, ...others };
};

export default useRemoteProsesPengujian;
