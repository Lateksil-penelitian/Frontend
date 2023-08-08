import { useEffect } from 'react';

import { useRouter } from 'next/router';
import useRemoteUserProfile from './remote/useRemoteUserProfile';

const useNoAuth = () => {
  const router = useRouter();
  const { data } = useRemoteUserProfile();

  useEffect(() => {
    if (data) router.replace('/');
  }, [data]);
};

export default useNoAuth;
