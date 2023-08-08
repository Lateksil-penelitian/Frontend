import { create } from 'zustand';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

const useAuthUserStore = create(
  (set) => {
    const cookies = parseCookies();
    const { _i: id, _e: email, _t: accessToken } = cookies;

    return {
      id,
      email,
      accessToken,
      setUserId: (newId) => {
        setCookie(null, '_id', newId, { path: '/' });
        set({ id: newId });
      },
      setLogin: (newEmail, newAccessToken) => {
        setCookie(null, '_e', newEmail, {
          path: '/',
        });
        setCookie(null, '_t', newAccessToken, {
          path: '/',
        });
        set({
          email: newEmail,
          accessToken: newAccessToken,
        });
      },
      removeUser: () => {
        destroyCookie(null, '_id', { path: '/' });
        destroyCookie(null, '_e', { path: '/' });
        destroyCookie(null, '_t', { path: '/' });
        set({
          id: undefined,
          email: undefined,
          accessToken: undefined,
        });
      },
    };
  },
  { name: 'user' }
);

export default useAuthUserStore;
