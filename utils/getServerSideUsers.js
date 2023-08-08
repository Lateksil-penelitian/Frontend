import { destroyCookie, parseCookies } from 'nookies';
import { fetcherWithContext } from '../libs/axios';

export const getServerSidePropsUsers = async (context) => {
  const { _e: email, _t: accessToken } = parseCookies(context, { path: '/' });

  const url = `/me/${email}`;
  const userResponse = await fetcherWithContext(url, context);

  if (email && accessToken) {
    if (userResponse) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    } else {
      destroyCookie(context, '_id', { path: '/' });
      destroyCookie(context, '_e', { path: '/' });
      destroyCookie(context, '_t', { path: '/' });
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};
