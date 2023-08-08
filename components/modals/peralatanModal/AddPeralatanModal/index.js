import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import Select from '../../../core/select';
import useRemoteCategoriesOptions from '../../../hooks/remote/useRemoteCategoriesOptions';
import useRemotePengujianOptions from '../../../hooks/remote/useRemotePengujianOptions';
import useMutationCreatePeralatan from '../../../hooks/mutation/useMutationCreatePeralatan';
import { useForm } from 'react-hook-form';

const AddPeralatanPengujianModal = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState('');
  const [pengujian, setPengujian] = useState('');
  const [disabled, setDisabled] = useState(true);

  const { data: categoryDataOption, isSuccess: isSuccessCategories } =
    useRemoteCategoriesOptions();

  const { data: pengujianDataOption, isSuccess: isSuccessPengujian } =
    useRemotePengujianOptions({
      category: category,
    });

  const { mutate: mutateCreatePeralatan, isLoading: isLoadingCreatePeralatan } =
    useMutationCreatePeralatan();

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (pengujian !== '') {
      setDisabled(false);
    }
    if (pengujianDataOption === undefined) {
      setDisabled(true);
    }
  }, [category, pengujian]);

  const onSubmit = (data) => {
    const formData = {
      pengujian_id: pengujian,
      nama_alat: data.nama_alat,
    };

    mutateCreatePeralatan(formData);
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent mx="4" as="form" onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <ModalHeader>
            <Text>Tambah Peralatan</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4} w="full" maxW="xl" fontSize="sm">
              <FormControl id="category" isRequired>
                <FormLabel>Pilih Kategori Pengujian</FormLabel>
                {isSuccessCategories ? (
                  <Select
                    options={categoryDataOption}
                    defaultValue={categoryDataOption[0]}
                    onChange={(option) => setCategory(option.value)}
                  />
                ) : (
                  <Box>Loading....</Box>
                )}
              </FormControl>
              <FormControl id="category" isRequired>
                <FormLabel>Pilih Jenis Pengujian</FormLabel>
                {isSuccessPengujian ? (
                  <Select
                    options={pengujianDataOption}
                    onChange={(option) => setPengujian(option.value)}
                  />
                ) : (
                  <Box>Loading....</Box>
                )}
              </FormControl>
              <FormControl id="nama_alat" isRequired>
                <FormLabel>Tambah Alat</FormLabel>
                <Input
                  type="text"
                  placeholder="Tambah Alat Pengujian"
                  {...register('nama_alat')}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter bg="gray.100">
            <ButtonGroup>
              <Button onClick={onClose} border="1px">
                Batal
              </Button>
              <Button
                isDisabled={disabled}
                isLoading={isLoadingCreatePeralatan}
                type="submit"
                variant="lateksil-solid"
              >
                Tambah Alat
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default AddPeralatanPengujianModal;
