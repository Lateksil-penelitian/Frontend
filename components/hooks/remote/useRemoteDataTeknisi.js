import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemoteDataTeknisi = ({ page, limit }) => {
  const uri = `/teknisi/all`;

  const { data, ...others } = useQuery(['teknisi', page, limit], () =>
    postFetcher(uri, {
      page: page,
      limit: limit,
    })
  );

  return { data, ...others };
};

export default useRemoteDataTeknisi;
