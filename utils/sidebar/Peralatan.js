import { IoDocumentText } from 'react-icons/io5';
import { MdPostAdd } from 'react-icons/md';

function generateSidebaritemPeralatan() {
  return [
    {
      name: 'Pengajuan Alat',
      path: '/peralatan',
      icon: IoDocumentText,
    },
    {
      name: 'Input Peralatan',
      path: '/peralatan/input-peralatan',
      icon: MdPostAdd,
    },
  ];
}

export default generateSidebaritemPeralatan;
