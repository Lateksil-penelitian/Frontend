import { PengerjaanTypes } from '../../../../utils/enum/PengerjaanTypes';

const StatusProgresTeknisi = ({ status }) => {
  switch (status) {
    case PengerjaanTypes.PENDING:
      return { color: 'orange', text: 'BELUM DIKERJAKAN' };
    case PengerjaanTypes.IN_PROGRESS:
      return { color: 'pink', text: 'SEDANG DIKERJAKAN' };
    case PengerjaanTypes.UPLOADED_FILE:
      return { color: 'pink', text: 'SEDANG DIKERJAKAN' };
    case PengerjaanTypes.COMPLETED:
      return { color: 'green', text: 'SELESAI' };
    default:
      return { color: 'gray', text: 'Error' };
  }
};

export default StatusProgresTeknisi;
