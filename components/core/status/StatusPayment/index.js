import { BooleanType } from '../../../../utils/enum/BooleanType';

const StatusPembayaran = ({ status }) => {
  switch (status) {
    case BooleanType.TRUE:
      return { color: 'green', text: 'Sudah Lunas' };
    case BooleanType.FALSE:
      return { color: 'gray', text: 'Belum Lunas' };
    default:
      return { color: 'red', text: 'Error' };
  }
};

export default StatusPembayaran;
