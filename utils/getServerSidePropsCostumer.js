import { destroyCookie, parseCookies } from 'nookies';
import { fetcherWithContext } from '../libs/axios';

export const getServerSidePropsCostumer = async (context) => {
  const { _e: email, _t: accessToken } = parseCookies(context, { path: '/' });

  if (email && accessToken) {
    const url = `/me/${email}`;

    const userResponse = await fetcherWithContext(url, context);

    if (userResponse) {
      if (userResponse.data.role === 'frontliner')
        return {
          redirect: {
            destination: '/frontliner',
            permanent: false,
          },
        };

      if (userResponse.data.role === 'manager')
        return {
          redirect: {
            destination: '/manager',
            permanent: false,
          },
        };

      if (userResponse.data.role === 'keuangan')
        return {
          redirect: {
            destination: '/keuangan',
            permanent: false,
          },
        };

      if (userResponse.data.role === 'peralatan')
        return {
          redirect: {
            destination: '/peralatan',
            permanent: false,
          },
        };
      if (userResponse.data.role === 'teknisi')
        return {
          redirect: {
            destination: '/teknisi',
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
