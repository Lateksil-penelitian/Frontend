import { destroyCookie, parseCookies } from 'nookies';
import { fetcherWithContext } from '../libs/axios';

export const getServerSideWithAllAuth = async (context) => {
  const { _e: email, _t: accessToken } = parseCookies(context, { path: '/' });

  if (email && accessToken) {
    const url = `/me/${email}`;

    const userResponse = await fetcherWithContext(url, context);

    if (!userResponse) {
      destroyCookie(context, '_id', { path: '/' });
      destroyCookie(context, '_e', { path: '/' });
      destroyCookie(context, '_t', { path: '/' });
    }

    const returnValue = {
      props: {},
    };

    return returnValue;
  }

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
};
