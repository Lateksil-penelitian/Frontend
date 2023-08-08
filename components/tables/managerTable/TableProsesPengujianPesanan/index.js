import React from 'react';
import {
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import formatCurrency from '../../../../utils/formatCurrently';
import ParseDate from '../../../core/parseDate';
import DetailProsesPengujian from '../../../modals/managerModal/detailProsesPengujian';
import AddTeknisiAndPeralatanModal from '../../../modals/managerModal/addTeknisiAndPeralatanModal';

const TableProsesPengujianPesanan = ({ pengujian }) => {
  const {
    isOpen: isOpenDetailPengujian,
    onOpen: onOpenDetailPengujian,
    onClose: onCloseDetailPengujian,
  } = useDisclosure();

  const {
    isOpen: isOpenPilihTeknisiAndPeralatan,
    onOpen: onOpenPilihTeknisiAndPeralatan,
    onClose: onClosePilihTeknisiAndPeralatan,
  } = useDisclosure();

  return (
    <>
      <Tr cursor="pointer">
        <Td onClick={onOpenDetailPengujian}>
          <Flex direction="column" w="full">
            <Text fontWeight="semibold">{pengujian.User.full_name}</Text>
            <Text>{pengujian.User.company_name}</Text>
          </Flex>
        </Td>
        <Td textAlign="center" onClick={onOpenDetailPengujian}>
          {pengujian.proyek.nama_proyek}
        </Td>
        <Td
          textAlign="center"
          color="blue.700"
          fontWeight="semibold"
          onClick={onOpenDetailPengujian}
        >
          Rp{formatCurrency(pengujian.total_price)}
        </Td>
        <Td textAlign="center" onClick={onOpenDetailPengujian}>
          {ParseDate(pengujian.createdAt)}
        </Td>
        <Td textAlign="center" onClick={onOpenDetailPengujian}>
          {ParseDate(pengujian.proyek.tanggal_mulai)}
        </Td>
        <Td textAlign="center" onClick={onOpenDetailPengujian}>
          {ParseDate(pengujian.proyek.tanggal_selesai)}
        </Td>
        <Td textAlign="center" onClick={onOpenDetailPengujian}>
          <Badge colorScheme="green" px="4" py="2">
            Lunas
          </Badge>
        </Td>

        <Td textAlign="center">
          <Button
            variant="lateksil-solid"
            onClick={onOpenPilihTeknisiAndPeralatan}
          >
            Tambah
          </Button>
        </Td>
      </Tr>
      <DetailProsesPengujian
        id={pengujian.id}
        isOpen={isOpenDetailPengujian}
        onClose={onCloseDetailPengujian}
      />
      <AddTeknisiAndPeralatanModal
        id={pengujian.id}
        isOpen={isOpenPilihTeknisiAndPeralatan}
        onClose={onClosePilihTeknisiAndPeralatan}
      />
    </>
  );
};

export default TableProsesPengujianPesanan;
