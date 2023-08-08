import { IoDocumentText } from 'react-icons/io5';
import { MdPostAdd } from 'react-icons/md';

function generateSidebaritemKeuangan() {
  return [
    {
      name: 'Laporan Pembayaran',
      path: '/keuangan',
      icon: IoDocumentText,
    },
    {
      name: 'Metode Pembayaran',
      path: '/keuangan/add-method-payment',
      icon: MdPostAdd,
    },
  ];
}

export default generateSidebaritemKeuangan;
