import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../../libs/axios';

const useRemoteBuktiPembayaranById = ({ id }) => {
  const uri = id ? `/payment/${id}` : null;

  const { data, ...others } = useQuery(['bukti-pembayaran', id], () =>
    fetcher(uri)
  );

  return { data, ...others };
};

export default useRemoteBuktiPembayaranById;
