import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';
import useAuthUserStore from '../../../store/useAuthUserStore';

const useRemoteOrder = ({ status_transaction }) => {
  const id = useAuthUserStore((state) => state.id);

  const uri = `/order`;

  const { data, ...others } = useQuery(['order', id, status_transaction], () =>
    postFetcher(uri, {
      user_id: id,
      page: 1,
      limit: 10,
      status_transaction,
    })
  );

  return { data, ...others };
};

export default useRemoteOrder;
