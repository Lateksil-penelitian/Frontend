import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemoteSelesaiPemesanan = ({ page, limit, search = '' }) => {
  const uri = `/order/selesai-pemesanan`;

  const { data, ...others } = useQuery(
    ['selesai-pemesanan', page, limit, search],
    () =>
      postFetcher(uri, {
        page,
        limit,
        search,
      })
  );

  return { data, ...others };
};

export default useRemoteSelesaiPemesanan;
