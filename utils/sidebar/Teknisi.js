import { BsFillPersonLinesFill } from 'react-icons/bs';
import { TbReport } from 'react-icons/tb';
import { MdPostAdd } from 'react-icons/md';

function generateSidebaritemTeknisi() {
  return [
    {
      name: 'Task Pengujian',
      path: '/teknisi',
      icon: BsFillPersonLinesFill,
    },
    {
      name: 'Pengerjaan',
      path: '/teknisi/pengerjaan',
      icon: MdPostAdd,
    },
    {
      name: 'Report',
      path: '/teknisi/report',
      icon: TbReport,
    },
  ];
}

export default generateSidebaritemTeknisi;
