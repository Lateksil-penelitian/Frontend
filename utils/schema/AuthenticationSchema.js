import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  full_name: Yup.string().required('Nama Lengkap harus di isi'),
  company_name: Yup.string().required('Nama Perusahaan harus di isi'),
  address: Yup.string().required('Alamat harus di isi'),
  no_whatsapp: Yup.string().required('No WhatsApp harus di isi'),
  email: Yup.string()
    .email('Format Email tidak sesuai')
    .required('Email harus diisi'),
  password: Yup.string()
    .required('Password Harus diisi')
    .min(6, 'Minimal terdiri dari 6 karakter'),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Format Email tidak sesuai')
    .required('Email harus diisi'),
  password: Yup.string()
    .required('Password Harus diisi')
    .min(6, 'Minimal terdiri dari 6 karakter'),
});

export const resetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Format email tidak sesuai')
    .required('Email harus diisi'),
});

export const changePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password harus diisi')
    .min(6, 'Minimal terdiri dari 6 karakter'),
  repassword: Yup.string()
    .required('Password harus diisi')
    .oneOf([Yup.ref('password'), null], 'Perubahan password harus sama'),
});
