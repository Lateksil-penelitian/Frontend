import { HiDocumentText, HiHomeModern, HiShoppingCart } from 'react-icons/hi2';

function generateSidebaritemUser() {
  return [
    {
      name: 'Halaman Utama',
      path: '/',
      icon: HiHomeModern,
    },
    {
      name: 'Keranjang',
      path: '/cart',
      icon: HiShoppingCart,
    },
    // {
    //   name: "Testing",
    //   path: "/testing",
    //   icon: HiCreditCard,
    // },
    {
      name: 'Riwayat Transaksi',
      path: '/order',
      icon: HiDocumentText,
    },
  ];
}

export default generateSidebaritemUser;
