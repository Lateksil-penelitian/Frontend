import { useQuery } from '@tanstack/react-query';
import { postFetcher } from '../../../libs/axios';
import useAuthUserStore from '../../../store/useAuthUserStore';

const useRemoteCart = () => {
  const id = useAuthUserStore((state) => state.id);

  const uri = `/cart`;

  const { data, ...others } = useQuery(['cart', id], () =>
    postFetcher(uri, {
      user_id: id,
    })
  );

  return { data, ...others };
};

export default useRemoteCart;
