import { TransactionTypes } from '../../../../utils/enum/TransactionTypes';

const StatusOrderTransaction = ({ status, message_canceled = '' }) => {
  switch (status) {
    case TransactionTypes.WAITING:
      return {
        color: 'orange',
        text: 'Menunggu',
        color_ket: 'orange.600',
        text_ket: `Sedang Menunggu Persetujuan, Mohon ditunggu`,
      };
    case TransactionTypes.ACCEPT:
      return {
        color: 'green',
        text: 'DiTerima',
        color_ket: 'green.600',
        text_ket: `Dimohon Pelanggan untuk segera membayar untuk
        melanjutkan proses`,
      };
    case TransactionTypes.IN_PROGRESS:
      return {
        color: 'pink',
        text: 'In Progress',
        color_ket: 'pink.600',
        text_ket: `Kami sedang Mengerjakan Pesanan kamu, Mohon untuk
        menunggu sampai proses selesai`,
      };
    case TransactionTypes.DONE:
      return {
        color: 'green',
        text: 'Selesai',
        color_ket: 'green.600',
        text_ket: `Yeah!!! Hasil Pengujianmu telah selesai`,
      };
    case TransactionTypes.CANCELED:
      return {
        color: 'red',
        text: 'Batal',
        color_ket: 'red.600',
        text_ket: `Dibatalkan karena, ${message_canceled}`,
      };
    default:
      return { color: 'gray', text: 'Error' };
  }
};

export default StatusOrderTransaction;
