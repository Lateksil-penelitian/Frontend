import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Collapse,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
  Td,
  Text,
  Textarea,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { baseUrl } from '../../../../libs/axios';
import formatCurrency from '../../../../utils/formatCurrently';
import Select from '../../../core/select';
import useMutationDeletePengujian from '../../../hooks/mutation/delete/useMutationDeletePengujian';
import useMutationUpdatePengujian from '../../../hooks/mutation/put/useMutationUpdatePengujian';
import useRemoteCategoriesOptions from '../../../hooks/remote/useRemoteCategoriesOptions';
import ModalWarning from '../../../modals/ModalWarning';

const PengujianTableFrontliner = ({ pengujian }) => {
  const [getIdPengujian, setGetIdPengujian] = useState(null);
  const [category, setCategory] = useState('');

  const { data: categoryDataOption } = useRemoteCategoriesOptions();
  const { mutate: mutateDeletePengujian } = useMutationDeletePengujian();
  const { mutate: mutateUpdatePengujian } = useMutationUpdatePengujian();

  const { register, handleSubmit, setValue, reset, control } = useForm();

  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const { isOpen: isOpenFullTextDescription, onToggle: onToggleDescription } =
    useDisclosure();

  const {
    isOpen: isOpenFullTextCatatanKhusus,
    onToggle: onToggleCatatanKhusus,
  } = useDisclosure();

  const onSubmit = async (data) => {
    const formData = {
      jenis_pengujian: data.jenis_pengujian,
      code: data.code,
      category: data.category.value,
      tempat_pengujian: data.tempat_pengujian,
      description: data.description,
      min_quantity: data.min_quantity,
      sampler: data.sampler,
      catatan_khusus: data.catatan_khusus,
      price: data.price,
    };
    mutateUpdatePengujian({ id: pengujian.id, formData: formData });
    onCloseUpdate();
    reset();
  };

  const onOpenDeleteModal = (id) => {
    onOpenDelete();
    setGetIdPengujian(id);
  };

  const handleDeletePengujian = () => {
    mutateDeletePengujian(getIdPengujian);
    onCloseDelete();
  };

  useEffect(() => {
    if (categoryDataOption) {
      setCategory(
        categoryDataOption?.find(
          (option) => option.value === pengujian.category
        )
      );
    }
  }, [isOpenUpdate]);

  useEffect(() => {
    if (isOpenUpdate && pengujian) {
      setValue('jenis_pengujian', pengujian.jenis_pengujian);
      setValue('code', pengujian.code);
      setValue('category', category);
      setValue('description', pengujian.description);
      setValue('min_quantity', pengujian.min_quantity);
      setValue('tempat_pengujian', pengujian.tempat_pengujian);
      setValue('sampler', pengujian.sampler);
      setValue('catatan_khusus', pengujian.catatan_khusus);
      setValue('price', pengujian.price);
    }
  }, [isOpenUpdate]);

  return (
    <React.Fragment key={pengujian.id}>
      <Tr>
        <Td w="20%">
          <HStack>
            <Image
              boxSize="70px"
              objectFit="cover"
              src={
                pengujian.image
                  ? `${baseUrl}uploads/${pengujian.image}`
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzaf-A9g3WCySkL8QBaTArVm5ELMy8NkXmb3tAmG0&s'
              }
              alt="Dan Abramov"
            />
            <Box>
              <Text fontWeight="medium">{pengujian.jenis_pengujian}</Text>
              <Text fontSize="sm" color="orange.600">
                {pengujian.code}
              </Text>
              <Badge
                fontSize="xs"
                colorScheme={
                  pengujian.tempat_pengujian === 'Lapangan' ? 'blue' : 'green'
                }
              >
                {pengujian.tempat_pengujian}
              </Badge>
            </Box>
          </HStack>
        </Td>
        <Td textAlign="center">{pengujian.category}</Td>
        <Td w="20%">
          <Collapse startingHeight={80} in={isOpenFullTextDescription}>
            <Text>{pengujian.description}</Text>
          </Collapse>
          {pengujian.description.length > 180 && (
            <Text
              mt="2"
              as="button"
              size="sm"
              onClick={onToggleDescription}
              textAlign="start"
              color="blue.400"
            >
              Tampilkan lebih {isOpenFullTextDescription ? 'Sedikit' : 'Banyak'}{' '}
            </Text>
          )}
        </Td>
        <Td textAlign="center">{pengujian.min_quantity}</Td>
        <Td textAlign="center">Per {pengujian.sampler}</Td>
        <Td w="20%">
          <Collapse startingHeight={80} in={isOpenFullTextCatatanKhusus}>
            <Text>{pengujian.catatan_khusus}</Text>
          </Collapse>
          {pengujian.catatan_khusus.length > 40 && (
            <Text
              mt="2"
              as="button"
              size="sm"
              onClick={onToggleCatatanKhusus}
              textAlign="start"
              color="blue.400"
            >
              Tampilkan lebih{' '}
              {isOpenFullTextCatatanKhusus ? 'Sedikit' : 'Banyak'}{' '}
            </Text>
          )}
        </Td>
        <Td isNumeric color="blue.700" fontWeight="semibold">
          Rp{formatCurrency(pengujian.price)}
        </Td>

        <Td>
          <Menu placement="left">
            <MenuButton
              as={IconButton}
              icon={<BsThreeDotsVertical />}
              width={5}
              rounded="xl"
            />
            <MenuList>
              <MenuItem
                onClick={onOpenUpdate}
                icon={<FiEdit />}
                color="blue.700"
              >
                Ubah
              </MenuItem>
              <MenuItem
                onClick={() => onOpenDeleteModal(pengujian.id)}
                icon={<FiTrash />}
                color="red.600"
              >
                Hapus
              </MenuItem>
            </MenuList>
          </Menu>
        </Td>
      </Tr>
      <Modal
        isOpen={isOpenUpdate}
        onClose={onCloseUpdate}
        scrollBehavior="inside"
        size="xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent mx="4" as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <Text>Update Pengujian</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4} w="full" maxW="xl" fontSize="sm" method="POST">
              <FormControl id="jenis_pengujian">
                <FormLabel>Jenis Pengujian</FormLabel>
                <Input
                  type="text"
                  placeholder="Jenis Pengujian"
                  {...register('jenis_pengujian')}
                />
              </FormControl>
              <FormControl id="jenis">
                <FormLabel>Code</FormLabel>
                <Input
                  type="text"
                  placeholder="SNI XX-XXXX-XXXX"
                  {...register('code')}
                />
              </FormControl>
              <FormControl id="category">
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
              </FormControl>
              <FormControl id="description">
                <FormLabel>Deskripsi</FormLabel>
                <Textarea
                  placeholder="Deskripsi..."
                  {...register('description')}
                />
              </FormControl>
              <FormControl id="min_quantity">
                <FormLabel>Min Kuantitas</FormLabel>
                <Input
                  type="number"
                  placeholder="Minimal Kuantitas dalam pengujian "
                  {...register('min_quantity')}
                />
              </FormControl>
              <FormControl id="sampler">
                <FormLabel>Sampler</FormLabel>
                <Input
                  type="text"
                  placeholder="Contoh: Per Titik / Paket / dll."
                  {...register('sampler')}
                />
              </FormControl>
              <FormControl id="catatan_khusus">
                <FormLabel>catatan khusus</FormLabel>
                <Textarea
                  placeholder="Catatan Khusus Pengujian untuk Costumer"
                  {...register('catatan_khusus')}
                />
              </FormControl>
              <FormControl id="tempat_pengujian" isRequired>
                <FormLabel>Pengujian Lakukan di</FormLabel>
                <RadioGroup defaultValue={pengujian.tempat_pengujian}>
                  <Stack spacing={10} direction="row">
                    <Radio
                      value="Laboratorium"
                      {...register('tempat_pengujian')}
                    >
                      Laboratorium
                    </Radio>
                    <Radio value="Lapangan" {...register('tempat_pengujian')}>
                      Lapangan
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              <FormControl id="price">
                <FormLabel>Harga Rp.</FormLabel>
                <Input
                  type="number"
                  placeholder="Harga"
                  {...register('price')}
                />
              </FormControl>
              <FormControl id="upload_image">
                <FormLabel>Upload Image</FormLabel>
                <Input type="file" p={0} />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter bg="gray.100">
            <ButtonGroup>
              <Button onClick={onCloseUpdate} border="1px">
                Batal
              </Button>
              <Button
                type="submit"
                variant="solid"
                bg="blue.700"
                color="white"
                rounded="md"
              >
                Update
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ModalWarning
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        buttonText="Hapus Pengujian"
        buttonOnClick={handleDeletePengujian}
      >
        Kamu yakin ingin menghapus Pengujian?
      </ModalWarning>
    </React.Fragment>
  );
};

export default PengujianTableFrontliner;
