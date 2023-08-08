import * as Yup from 'yup';

export const MethodTransactionSchema = Yup.object().shape({
  type_transaction: Yup.string().required('Type Transaction harus di isi'),
  bank: Yup.string().required('Nama Bank harus di isi'),
  name_bank: Yup.string().required('Nama Akun Bank harus di isi'),
  no_rek: Yup.string().required('No Rekening harus di isi'),
});
