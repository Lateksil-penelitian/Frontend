import * as Yup from 'yup';

export const PengujianSchema = Yup.object().shape({
  jenis_pengujian: Yup.string().required('Jenis Pengujian harus di isi'),
  code: Yup.string().required('Code harus di isi'),
  category: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().required('Kategori Pengujian harus dipilih'),
  }),
  description: Yup.string().required('Deskripsi harus di isi'),
  min_quantity: Yup.string().required('Min Kuantitas harus di isi'),
  sampler: Yup.string().required('Sampler harus di isi'),
  price: Yup.string().required('Price harus di isi'),
  catatan_khusus: Yup.string().required('Catatan Khusus harus di isi'),
  price: Yup.string().required('Harga Khusus harus di isi'),
});
