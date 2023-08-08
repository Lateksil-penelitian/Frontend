import React from 'react';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useMutationCreatePengujian from '../../../hooks/mutation/useMutationCreatePengujian';
import Select from '../../../core/select';
import useRemoteCategoriesOptions from '../../../hooks/remote/useRemoteCategoriesOptions';
import { PengujianSchema } from '../../../../utils/schema/PengujianSchema';
import useToastNotification from '../../../hooks/useToastNotification';

const AddPengujianModal = ({ isOpen, onClose }) => {
  const showToast = useToastNotification();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PengujianSchema),
  });

  const { data: categoryDataOption } = useRemoteCategoriesOptions();

  const { mutate: mutateCreatePengujian, isLoading } =
    useMutationCreatePengujian();

  const onModalClose = () => {
    onClose();
    reset();
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('jenis_pengujian', data.jenis_pengujian);
    formData.append('code', data.code);
    formData.append('category', data.category?.value);
    formData.append('description', data.description);
    formData.append('min_quantity', data.min_quantity);
    formData.append('sampler', data.sampler);
    formData.append('tempat_pengujian', data.tempat_pengujian);
    formData.append('price', data.price);
    formData.append('catatan_khusus', data.catatan_khusus);
    formData.append('image', data.image[0]);

    try {
      mutateCreatePengujian(formData);
    } catch (error) {
      showToast('Server Sedang Bermasalah', 'error');
    } finally {
      onModalClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onModalClose}
      scrollBehavior="inside"
      size="xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        mx="4"
        overflowY="auto"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <ModalHeader>
          <Text>Tambah Pengujian</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4} w="full" maxW="xl" fontSize="sm" method="POST">
            <FormControl
              id="jenis_pengujian"
              isInvalid={!!errors.jenis_pengujian}
              isRequired
            >
              <FormLabel>Jenis Pengujian</FormLabel>
              <Input
                type="text"
                placeholder="Jenis Pengujian"
                {...register('jenis_pengujian')}
              />
              <FormErrorMessage>
                {errors.jenis_pengujian && errors.jenis_pengujian.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="code" isInvalid={!!errors.code} isRequired>
              <FormLabel>Code</FormLabel>
              <Input
                type="text"
                placeholder="SNI XX-XXXX-XXXX"
                {...register('code')}
              />
              <FormErrorMessage>
                {errors.code && errors.code.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="category" isInvalid={!!errors.category} isRequired>
              <FormLabel>Kategori Pengujian</FormLabel>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    placeholder="Pilih Kategori Pengujian"
                    options={categoryDataOption}
                    {...field}
                  />
                )}
              />
              <FormErrorMessage>
                {errors.category && errors.category.value.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              id="description"
              isInvalid={!!errors.description}
              isRequired
            >
              <FormLabel>Deskripsi</FormLabel>
              <Textarea
                placeholder="Deskripsi..."
                {...register('description')}
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              id="min_quantity"
              isInvalid={!!errors.min_quantity}
              isRequired
            >
              <FormLabel>Min Kuantitas</FormLabel>
              <Input
                type="number"
                placeholder="Minimal Kuantitas dalam pengujian "
                {...register('min_quantity')}
              />
              <FormErrorMessage>
                {errors.min_quantity && errors.min_quantity.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="sampler" isInvalid={!!errors.sampler} isRequired>
              <FormLabel>Sampler</FormLabel>
              <Input
                type="text"
                placeholder="Contoh: Per Titik / Paket / dll."
                {...register('sampler')}
              />
              <FormErrorMessage>
                {errors.sampler && errors.sampler.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              id="catatan_khusus"
              isInvalid={!!errors.catatan_khusus}
              isRequired
            >
              <FormLabel>catatan khusus</FormLabel>
              <Textarea
                placeholder="Catatan Khusus Pengujian untuk Costumer"
                {...register('catatan_khusus')}
              />
              <FormErrorMessage>
                {errors.catatan_khusus && errors.catatan_khusus.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="tempat_pengujian" isRequired>
              <FormLabel>Pengujian Lakukan di</FormLabel>
              <RadioGroup defaultValue="Laboratorium">
                <Stack spacing={10} direction="row">
                  <Radio value="Laboratorium" {...register('tempat_pengujian')}>
                    Laboratorium
                  </Radio>
                  <Radio value="Lapangan" {...register('tempat_pengujian')}>
                    Lapangan
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl id="price" isInvalid={!!errors.price} isRequired>
              <FormLabel>Harga Rp.</FormLabel>
              <Input type="number" placeholder="Harga" {...register('price')} />
              <FormErrorMessage>
                {errors.price && errors.price.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="upload_image">
              <FormLabel>Upload Image</FormLabel>
              <Input type="file" p={0} {...register('image')} />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter bg="gray.100">
          <ButtonGroup>
            <Button onClick={onClose} border="1px">
              Batal
            </Button>
            <Button
              type="submit"
              variant="lateksil-solid"
              isLoading={isLoading}
            >
              Tambah
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPengujianModal;
