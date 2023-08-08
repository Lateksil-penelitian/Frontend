import React, { useEffect } from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
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
  Stack,
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import formatCurrency from '../../../../utils/formatCurrently';
import DetailPengajuanPesanan from '../../../modals/frontlinerModal/detailPengajuanPesananModal';
import { useForm } from 'react-hook-form';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdCancel, MdCheckBox } from 'react-icons/md';
import { TransactionTypes } from '../../../../utils/enum/TransactionTypes';
import useMutationPersetujuanToFrontliner from '../../../hooks/mutation/put/useMutationPersetujuanToFrontliner';
import ParseDate from '../../../core/parseDate';

const TablePersetujuanPesanan = ({ order }) => {
  const { mutate: mutateSendToFronliner } =
    useMutationPersetujuanToFrontliner();
  const {
    isOpen: isOpenDetailHistory,
    onOpen: onOpenDetailHistory,
    onClose: onCloseDetailHistory,
  } = useDisclosure();

  const {
    isOpen: isOpenAccept,
    onOpen: onOpenAccept,
    onClose: onCloseAccept,
  } = useDisclosure();

  const {
    isOpen: isOpenCanceled,
    onOpen: onOpenCanceled,
    onClose: onCloseCanceled,
  } = useDisclosure();

  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmitAccepted = (data) => {
    const formData = {
      id: order.id,
      status_persetujuan: TransactionTypes.ACCEPT,
      tanggal_mulai: data.tanggal_mulai,
      tanggal_selesai: data.tanggal_selesai,
      keterangan_to_client: data.keterangan_to_client,
    };
    mutateSendToFronliner({ formData: formData });

    onCloseAccept();
    reset();
  };

  const onSubmitCanceled = (data) => {
    const formData = {
      id: order.id,
      status_persetujuan: TransactionTypes.CANCELED,
      keterangan_to_client: data.keterangan_to_client,
    };
    mutateSendToFronliner({ formData: formData });

    onCloseAccept();
    reset();
  };

  useEffect(() => {
    if (isOpenAccept && order) {
      setValue('tanggal_mulai', order.proyek.tanggal_mulai);
      setValue('tanggal_selesai', order.proyek.tanggal_selesai);
    }
  }, [isOpenAccept]);

  return (
    <>
      <Tr>
        <Td onClick={onOpenDetailHistory} cursor="pointer">
          <Flex direction="column" w="full">
            <Text fontWeight="semibold">{order.User.full_name}</Text>
            <Text>{order.User.company_name}</Text>
          </Flex>
        </Td>
        <Td onClick={onOpenDetailHistory} textAlign="center" cursor="pointer">
          {order.proyek.nama_proyek}
        </Td>
        <Td textAlign="center" cursor="pointer" onClick={onOpenDetailHistory}>
          {ParseDate(order.createdAt)}
        </Td>
        <Td
          onClick={onOpenDetailHistory}
          cursor="pointer"
          textAlign="center"
          fontWeight="semibold"
          color="blue.700"
          isNumeric
        >
          Rp{formatCurrency(order.total_price)}
        </Td>
        <Td textAlign="center" onClick={onOpenDetailHistory} cursor="pointer">
          {ParseDate(order.proyek.tanggal_mulai)}
        </Td>
        <Td textAlign="center" onClick={onOpenDetailHistory} cursor="pointer">
          {ParseDate(order.proyek.tanggal_selesai)}
        </Td>
        <Td textAlign="center">
          {order.status.status_persetujuan === TransactionTypes.WAITING ? (
            <Menu placement="left">
              <MenuButton
                as={IconButton}
                icon={<BsThreeDotsVertical />}
                width={5}
                rounded="xl"
              />
              <MenuList>
                <MenuItem
                  icon={<MdCheckBox size={20} />}
                  fontWeight="semibold"
                  color="green.700"
                  onClick={onOpenAccept}
                >
                  Diterima
                </MenuItem>
                <MenuItem
                  icon={<MdCancel size={20} />}
                  color="red.600"
                  fontWeight="semibold"
                  onClick={onOpenCanceled}
                >
                  Ditolak
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Badge
              rounded="md"
              px={3}
              py={1}
              colorScheme={
                order.status.status_persetujuan === TransactionTypes.ACCEPT
                  ? 'green'
                  : 'red'
              }
            >
              {order.status.status_persetujuan === TransactionTypes.ACCEPT
                ? 'Accepted'
                : 'Canceled'}
            </Badge>
          )}
        </Td>
      </Tr>

      <Modal
        isOpen={isOpenAccept}
        onClose={onCloseAccept}
        scrollBehavior="inside"
        size="2xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          mx="4"
          overflow="hidden"
          as="form"
          onSubmit={handleSubmit(onSubmitAccepted)}
        >
          <ModalCloseButton />
          <ModalHeader>
            <Text>Terima Pengujian</Text>
          </ModalHeader>
          <ModalBody>
            <Stack pb="10">
              <FormControl id="tanggal_mulai">
                <FormLabel>Tanggal Mulai</FormLabel>
                <Input type="datetime-local" {...register('tanggal_mulai')} />
              </FormControl>
              <FormControl id="tanggal_selesai">
                <FormLabel>Tanggal Selesai</FormLabel>
                <Input type="datetime-local" {...register('tanggal_selesai')} />
              </FormControl>
              <FormControl id="keterangan_to_client" isRequired>
                <FormLabel>Keterangan Diterima</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukan Keterangan Jika Diterima"
                  {...register('keterangan_to_client')}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter bg="gray.100">
            <ButtonGroup>
              <Button border="1px" onClick={onCloseAccept}>
                Batal
              </Button>
              <Button
                type="submit"
                variant="solid"
                bg="green.700"
                _hover={{ bg: 'green.800' }}
                color="white"
                rounded="md"
              >
                Kirim
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isOpenCanceled}
        onClose={onCloseCanceled}
        scrollBehavior="inside"
        size="2xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          mx="4"
          overflow="hidden"
          as="form"
          onSubmit={handleSubmit(onSubmitCanceled)}
        >
          <ModalCloseButton />
          <ModalHeader>
            <Text>Batal Pengujian</Text>
          </ModalHeader>
          <ModalBody>
            <Stack pb="10">
              <FormControl id="keterangan_to_client" isRequired>
                <FormLabel>Keterangan Dibatalkan</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukan Keterangan Jika Diterima"
                  {...register('keterangan_to_client')}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter bg="gray.100">
            <ButtonGroup>
              <Button border="1px" onClick={onCloseCanceled}>
                Batal
              </Button>
              <Button
                type="submit"
                variant="solid"
                bg="red.700"
                _hover={{ bg: 'red.800' }}
                color="white"
                rounded="md"
              >
                Kirim
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <DetailPengajuanPesanan
        id={order.id}
        isOpen={isOpenDetailHistory}
        onClose={onCloseDetailHistory}
      />
    </>
  );
};

export default TablePersetujuanPesanan;
