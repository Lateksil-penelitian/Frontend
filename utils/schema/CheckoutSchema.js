import * as Yup from 'yup';

export const CheckoutSchema = Yup.object().shape({
  nama_proyek: Yup.string().required('Nama Pekerjaan harus di isi'),
  tujuan_proyek: Yup.string().required('Tujuan Pengujian harus di isi'),
});
