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
import ParseDate from '../../../core/parseDate';
import UploadFilePengujianTeknisi from '../../../modals/teknisiModal/uploadFilePengujianModal';
import DetailTeknisiPengerjaan from '../../../modals/teknisiModal/detailTeknisiPengerjaan';
const TablePengerjaanTask = ({ pengujian }) => {
  const {
    isOpen: isOpenUploadFile,
    onOpen: onOpenUploadFile,
    onClose: onCloseUploadFile,
  } = useDisclosure();

  const {
    isOpen: isOpenDetailPengujian,
    onOpen: onOpenDetailPengujian,
    onClose: onCloseDetailPengujian,
  } = useDisclosure();

  return (
    <>
      <Tr>
        <Td cursor="pointer" onClick={onOpenDetailPengujian}>
          <Flex direction="column" w="full">
            <Text fontWeight="semibold">{pengujian.order.User.full_name}</Text>
            <Text>{pengujian.order.User.company_name}</Text>
          </Flex>
        </Td>
        <Td textAlign="center" cursor="pointer" onClick={onOpenDetailPengujian}>
          {pengujian.order.proyek.no_surat}
        </Td>
        <Td textAlign="center" cursor="pointer" onClick={onOpenDetailPengujian}>
          {pengujian.order.proyek.nama_proyek}
        </Td>
        <Td textAlign="center" cursor="pointer" onClick={onOpenDetailPengujian}>
          {pengujian.order.proyek.tujuan_proyek}
        </Td>
        <Td textAlign="center" cursor="pointer" onClick={onOpenDetailPengujian}>
          {ParseDate(pengujian.order.proyek.tanggal_mulai)}
        </Td>
        <Td textAlign="center" cursor="pointer" onClick={onOpenDetailPengujian}>
          {ParseDate(pengujian.order.proyek.tanggal_selesai)}
        </Td>
        <Td textAlign="center" cursor="pointer">
          <Badge colorScheme="pink" p="2" rounded="md" w="full">
            Sedang Dikerjakan
          </Badge>
        </Td>
        <Td textAlign="center" cursor="pointer">
          <Button variant="lateksil-solid" onClick={onOpenUploadFile}>
            Upload
          </Button>
        </Td>
      </Tr>
      <UploadFilePengujianTeknisi
        id={pengujian.id}
        isOpen={isOpenUploadFile}
        onClose={onCloseUploadFile}
      />
      <DetailTeknisiPengerjaan
        id={pengujian.order.id}
        isOpen={isOpenDetailPengujian}
        onClose={onCloseDetailPengujian}
      />
    </>
  );
};

export default TablePengerjaanTask;
