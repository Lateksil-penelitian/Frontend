import { create } from 'zustand';

const useCartStore = create((set) => ({
  totalPrice: 0,
  updateTotalPrice: (totalPrice) => set(() => ({ totalPrice: totalPrice })),
}));

export default useCartStore;
