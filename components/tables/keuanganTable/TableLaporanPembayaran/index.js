import {
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { BooleanType } from '../../../../utils/enum/BooleanType';
import formatCurrency from '../../../../utils/formatCurrently';
import BuktiPembayaranModal from '../../../modals/keuanganModal/buktiPembayaranModal';
import DetailLaporanKeuangan from '../../../modals/keuanganModal/detailLaporanPembayaran';
import UploadKwitansiModal from '../../../modals/keuanganModal/uploadKwitansiModal';

const TableLaporanPemabayaran = ({ order }) => {
  const {
    isOpen: isOpenBuktiPembayaran,
    onOpen: onOpenBuktiPembayaran,
    onClose: onCloseBuktiPembayaran,
  } = useDisclosure();

  const {
    isOpen: isOpenUploadKwitansi,
    onOpen: onOpenUploadKwitansi,
    onClose: onCloseUploadKwitansi,
  } = useDisclosure();

  const {
    isOpen: isOpenDetailOrder,
    onOpen: onOpenDetailOrder,
    onClose: onCloseDetailOrder,
  } = useDisclosure();

  return (
    <>
      <Tr>
        <Td onClick={onOpenDetailOrder} cursor="pointer">
          <Flex direction="column" w="full">
            <Text fontWeight="semibold">{order.User.full_name}</Text>
            <Text>{order.User.company_name}</Text>
          </Flex>
        </Td>
        <Td textAlign="center" onClick={onOpenDetailOrder} cursor="pointer">
          {order.proyek.nama_proyek}
        </Td>
        <Td textAlign="center" onClick={onOpenDetailOrder} cursor="pointer">
          {order.proyek.tujuan_proyek}
        </Td>
        <Td isNumeric>
          <Text
            color="blue.700"
            fontWeight="semibold"
            onClick={onOpenDetailOrder}
            cursor="pointer"
          >
            Rp{formatCurrency(order.total_price)}
          </Text>
        </Td>
        <Td textAlign="center" onClick={onOpenDetailOrder} cursor="pointer">
          <Badge w="full" colorScheme="green" rounded="md" px={3} py={1}>
            Sudah Bayar
          </Badge>
        </Td>
        <Td textAlign="center" w="15%" onClick={onOpenBuktiPembayaran}>
          <Text
            color="blackAlpha.700"
            fontWeight="semibold"
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
          >
            Lihat
          </Text>
        </Td>
        <Td textAlign="center">
          <Button
            onClick={onOpenUploadKwitansi}
            w="full"
            isDisabled={
              order.status.accept_payment === BooleanType.TRUE ? true : false
            }
            variant="lateksil-solid"
            size="md"
          >
            {order.status.accept_payment === BooleanType.TRUE
              ? 'Terkirim'
              : 'Upload'}
          </Button>
        </Td>
      </Tr>
      <BuktiPembayaranModal
        id={order.id}
        isOpen={isOpenBuktiPembayaran}
        onClose={onCloseBuktiPembayaran}
      />
      <UploadKwitansiModal
        id={order.id}
        isOpen={isOpenUploadKwitansi}
        onClose={onCloseUploadKwitansi}
      />
      <DetailLaporanKeuangan
        id={order.id}
        isOpen={isOpenDetailOrder}
        onClose={onCloseDetailOrder}
      />
    </>
  );
};

export default TableLaporanPemabayaran;
