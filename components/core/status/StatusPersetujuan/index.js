import { PersetujuanTypes } from '../../../../utils/enum/PersetujuanTypes';
import { TransactionTypes } from '../../../../utils/enum/TransactionTypes';

const StatusPersetujuan = ({ status }) => {
  switch (status) {
    case PersetujuanTypes.CANCELED:
      return { color: 'red', text: 'Canceled' };
    case PersetujuanTypes.WAITING:
      return { color: 'orange', text: 'Waiting' };
    case TransactionTypes.ACCEPT:
      return { color: 'green', text: 'Accept' };
    default:
      return { color: 'gray', text: 'Error' };
  }
};

export default StatusPersetujuan;
