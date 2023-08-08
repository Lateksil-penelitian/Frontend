import { TransactionTypes } from '../../../../utils/enum/TransactionTypes';

const StatusOrderPengujian = ({ status }) => {
  switch (status) {
    case TransactionTypes.WAITING:
      return { color: 'orange', text: 'Waiting' };
    case TransactionTypes.IN_PROGRESS:
      return { color: 'pink', text: 'In Progress' };
    case TransactionTypes.DONE:
      return { color: 'green', text: 'Done' };
    default:
      return { color: 'gray', text: 'Error' };
  }
};

export default StatusOrderPengujian;
