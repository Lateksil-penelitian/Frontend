import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemoteTahapPengerjaan = ({ page, limit, search = '' }) => {
  const uri = `/tahap-pengerjaan`;

  const { data, ...others } = useQuery(
    ['tahap-pengerjaan', page, limit, search],
    () =>
      postFetcher(uri, {
        page,
        limit,
        search,
      })
  );

  return { data, ...others };
};

export default useRemoteTahapPengerjaan;
