import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';
import useAuthUserStore from '../../../store/useAuthUserStore';

const useRemoteOrderByIdTeknisi = ({ status_task, page, limit }) => {
  const id = useAuthUserStore((state) => state.id);

  const uri = `/teknisi`;

  const { data, ...others } = useQuery(
    ['teknisi', status_task, page, limit, id],
    () =>
      postFetcher(uri, {
        teknisi_id: id,
        status_task,
        page: page,
        limit: limit,
      })
  );

  return { data, ...others };
};

export default useRemoteOrderByIdTeknisi;
