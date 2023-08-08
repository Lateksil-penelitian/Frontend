import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';

const useRemotePengujianOptions = ({ category }) => {
  const uri = `/pengujian/client`;

  const { data, ...others } = useQuery(['pengujian-option', category], () =>
    postFetcher(uri, {
      page: 1,
      limit: 100,
      search: '',
      filter: {
        category: category ? category : '',
      },
    })
  );

  const newData = data?.data?.map((item) => ({
    label: item.jenis_pengujian,
    value: item.id,
  }));

  return { data: newData, ...others };
};

export default useRemotePengujianOptions;
