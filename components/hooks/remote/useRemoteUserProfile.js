import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../../libs/axios';
import useAuthUserStore from '../../../store/useAuthUserStore';

const useRemoteUserProfile = () => {
  const email = useAuthUserStore((state) => state.email);
  const [setUserId, removeUser] = useAuthUserStore((state) => [
    state.setUserId,
    state.removeUser,
  ]);

  const uri = email ? `/me/${email}` : null;

  const { data, isError, ...others } = useQuery(['info-user'], () =>
    fetcher(uri)
  );

  useEffect(() => {
    if (data && data.data && data.data.id) {
      setUserId(data.data.id);
    } else if (isError) {
      removeUser();
    }
  }, [data]);
  return { data, ...others };
};

export default useRemoteUserProfile;
