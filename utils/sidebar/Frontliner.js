import { IoDocumentText } from 'react-icons/io5';
import { MdPostAdd } from 'react-icons/md';

function generateSidebaritemFrontliner() {
  return [
    {
      name: 'Proyek Pengujian',
      path: '/',
      icon: IoDocumentText,
      sub: [
        {
          name: 'Pengajuan Pemesanan',
          path: '/frontliner',
        },
        // {
        //   name: 'Proses Pengujian',
        //   path: '/frontliner/proses-pengujian',
        // },
        {
          name: 'Tahap Pengerjaan',
          path: '/frontliner/tahap-pengerjaan',
        },
        {
          name: 'Selesai Pemesanan',
          path: '/frontliner/selesai-pemesanan',
        },
      ],
    },
    {
      name: 'Input Pengujian',
      path: '/frontliner/input-pengujian',
      icon: MdPostAdd,
    },
    // {
    //   name: 'Data Costumer',
    //   path: '/frontliner/data-costumer',
    //   icon: MdOutlinePeopleOutline,
    // },
  ];
}

export default generateSidebaritemFrontliner;
