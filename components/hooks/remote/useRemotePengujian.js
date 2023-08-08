import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemotePengujian = ({ page, limit, tempat_pengujian, search }) => {
  const uri = `/pengujian`;

  const { data, ...others } = useQuery(
    ['pengujian', page, limit, tempat_pengujian, search],
    () =>
      postFetcher(uri, {
        page,
        limit,
        search,
        filter: {
          category: '',
          tempat_pengujian,
        },
      })
  );

  return { data, ...others };
};

export default useRemotePengujian;
