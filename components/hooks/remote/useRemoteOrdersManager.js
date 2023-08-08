import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemoteOrdersManager = ({ status_persetujuan }) => {
  const uri = `/manager/persetujuan_pesanan`;

  const { data, ...others } = useQuery(
    ['persetujuan_pesanan', status_persetujuan],
    () =>
      postFetcher(uri, {
        page: 1,
        limit: 10,
        status_persetujuan,
      })
  );

  return { data, ...others };
};

export default useRemoteOrdersManager;
