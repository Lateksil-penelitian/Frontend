import { PengambilaAlatType } from '../../../../utils/enum/PembambilanAlatType';

const StatusPeralatan = ({ status }) => {
  switch (status) {
    case PengambilaAlatType.PENDING:
      return { color: 'pink', text: 'SEDANG DIAMBIL' };
    case PengambilaAlatType.COMPLETED:
      return { color: 'green', text: 'SUDAH DIAMBIL' };
    default:
      return { color: 'gray', text: 'Error' };
  }
};

export default StatusPeralatan;
