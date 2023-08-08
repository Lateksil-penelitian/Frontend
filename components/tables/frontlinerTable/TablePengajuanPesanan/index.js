import React from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Flex,
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
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import formatCurrency from '../../../../utils/formatCurrently';
import DetailPengajuanPesanan from '../../../modals/frontlinerModal/detailPengajuanPesananModal';
import { TransactionTypes } from '../../../../utils/enum/TransactionTypes';
import { useForm } from 'react-hook-form';
import useMutationUpdateProyek from '../../../hooks/mutation/put/useMutationUpdateProyek';
import { BooleanType } from '../../../../utils/enum/BooleanType';
import SendCostumerModal from '../../../modals/frontlinerModal/sendCostumerModal';
import ParseDate from '../../../core/parseDate';

const TablePengajuanPesanan = ({ order }) => {
  const { mutate: mutateSendToManager } = useMutationUpdateProyek();

  const {
    isOpen: isOpenDetailHistory,
    onOpen: onOpenDetailHistory,
    onClose: onCloseDetailHistory,
  } = useDisclosure();

  const {
    isOpen: isOpenSendToManager,
    onOpen: onOpenSendToManager,
    onClose: onCLoseSendToManager,
  } = useDisclosure();

  const {
    isOpen: isOpenCanceledCostumer,
    onOpen: onOpenCanceledCostumer,
    onClose: onCloseCanceledCostumer,
  } = useDisclosure();

  const {
    isOpen: isOpenAcceptedCostumer,
    onOpen: onOpenAcceptedCostumer,
    onClose: onCloseAcceptedCostumer,
  } = useDisclosure();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const formData = {
      id: order.id,
      no_refrensi: data.no_refrensi,
      no_identifikasi: data.no_identifikasi,
      no_surat: data.no_surat,
      tanggal_mulai: data.tanggal_mulai,
      tanggal_selesai: data.tanggal_selesai,
    };
    mutateSendToManager({ formData: formData });

    onCLoseSendToManager();
    reset();
  };

  const statusOrder = (status) => {
    if (status === TransactionTypes.WAITING) {
      return 'orange';
    }
    if (status === TransactionTypes.CANCELED) {
      return 'red';
    }
    if (status === TransactionTypes.ACCEPT) {
      return 'green';
    }
  };

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
          <Badge
            colorScheme={
              order.status.status_payment === BooleanType.TRUE
                ? 'green'
                : 'gray'
            }
            rounded="md"
            px={3}
            py={1}
          >
            {order.status.status_payment === BooleanType.TRUE
              ? 'Sudah Lunas'
              : 'Belum Lunas'}
          </Badge>
        </Td>
        <Td textAlign="center" onClick={onOpenDetailHistory} cursor="pointer">
          <Badge
            colorScheme={statusOrder(order.status.status_persetujuan)}
            rounded="md"
            px={3}
            cursor="pointer"
            py={1}
          >
            {order.status.status_persetujuan === TransactionTypes.WAITING &&
              'Waiting'}
            {order.status.status_persetujuan === TransactionTypes.CANCELED &&
              'Canceled'}
            {order.status.status_persetujuan === TransactionTypes.ACCEPT &&
              'Accept'}
          </Badge>
        </Td>
        <Td>
          {order.status.status_persetujuan === TransactionTypes.WAITING && (
            <Button
              w="full"
              colorScheme="blue"
              size="md"
              onClick={onOpenSendToManager}
              isDisabled={
                order.status.is_send_manager === BooleanType.TRUE ? true : false
              }
            >
              {order.status.is_send_manager === BooleanType.TRUE
                ? 'Terikirim'
                : 'Send Manager'}
            </Button>
          )}
          {order.status.status_persetujuan === TransactionTypes.CANCELED && (
            <Button
              w="full"
              onClick={onOpenCanceledCostumer}
              colorScheme="orange"
              size="md"
              isDisabled={
                order.status.is_send_costumer === BooleanType.TRUE
                  ? true
                  : false
              }
            >
              {order.status.is_send_costumer === BooleanType.TRUE
                ? 'Terikirim'
                : 'Send Costumer'}
            </Button>
          )}
          {order.status.status_persetujuan === TransactionTypes.ACCEPT && (
            <Button
              w="full"
              colorScheme="orange"
              size="md"
              onClick={onOpenAcceptedCostumer}
              isDisabled={
                order.status.is_send_costumer === BooleanType.TRUE
                  ? true
                  : false
              }
            >
              {order.status.is_send_costumer === BooleanType.TRUE
                ? 'Terikirim'
                : 'Send Costumer'}
            </Button>
          )}
        </Td>
      </Tr>
      <SendCostumerModal
        id={order.id}
        isAccepted={false}
        isOpen={isOpenCanceledCostumer}
        onClose={onCloseCanceledCostumer}
      />
      <SendCostumerModal
        id={order.id}
        isAccepted={true}
        isOpen={isOpenAcceptedCostumer}
        onClose={onCloseAcceptedCostumer}
      />
      <Modal
        isOpen={isOpenSendToManager}
        onClose={onCLoseSendToManager}
        scrollBehavior="inside"
        size="2xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          mx="4"
          overflow="hidden"
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ModalCloseButton />
          <ModalHeader>
            <Text>Input Pengajuan Pemesanan</Text>
          </ModalHeader>
          <ModalBody>
            <Stack pb="10">
              <FormControl id="no_refrensi" isRequired>
                <FormLabel>No. Refrensi</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukan No Refrensi"
                  {...register('no_refrensi')}
                />
              </FormControl>
              <FormControl id="no_identifikasi" isRequired>
                <FormLabel>No. Identifikasi</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukan No Identifikasi"
                  {...register('no_identifikasi')}
                />
              </FormControl>
              <FormControl id="no_surat" isRequired>
                <FormLabel>No. Surat</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukan No Surat"
                  {...register('no_surat')}
                />
              </FormControl>
              <FormControl id="tanggal_mulai" isRequired>
                <FormLabel>Tanggal Mulai</FormLabel>
                <Input type="datetime-local" {...register('tanggal_mulai')} />
              </FormControl>
              <FormControl id="tanggal_selesai" isRequired>
                <FormLabel>Tanggal Selesai</FormLabel>
                <Input type="datetime-local" {...register('tanggal_selesai')} />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter bg="gray.100">
            <ButtonGroup>
              <Button border="1px" onClick={onCLoseSendToManager}>
                Batal
              </Button>
              <Button
                type="submit"
                variant="solid"
                bg="blue.700"
                _hover={{ bg: 'blue.800' }}
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

export default TablePengajuanPesanan;
