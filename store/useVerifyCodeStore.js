import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useVerifyCodeStore = create(
  persist(
    (set, get) => ({
      email: '',
      setEmailStorage: (email) => set(() => ({ email: email })),
    }),
    {
      name: 'email-store',
      getStorage: () => localStorage,
      partialize: (state) => ({ email: state.email }),
    }
  )
);

export default useVerifyCodeStore;
