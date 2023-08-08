import React from 'react';
import {
  Badge,
  Flex,
  IconButton,
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { baseUrl } from '../../../../libs/axios';
import { FiDownload } from 'react-icons/fi';
import DetailTahapPengerjaan from '../../../modals/managerModal/detailTahapPengerjaan';
import DetailTeknisiProgressFrontliner from '../../../modals/frontlinerModal/detailTeknisiModalFrontliner';

const TableSelesaiPemesananManager = ({ pengujian }) => {
  const router = useRouter();
  const {
    isOpen: isOpenDetailPengujian,
    onOpen: onOpenDetailPengujian,
    onClose: onCloseDetailPengujian,
  } = useDisclosure();

  const {
    isOpen: isOpenTeknisiProgress,
    onOpen: onOpenTeknisiProgress,
    onClose: onCloseTeknisiProgress,
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
        <Td textAlign="center" onClick={onOpenDetailPengujian}>
          {pengujian.proyek.no_identifikasi}
        </Td>
        <Td textAlign="center" onClick={onOpenTeknisiProgress}>
          <Text
            color="blackAlpha.700"
            fontWeight="semibold"
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
          >
            Lihat
          </Text>
        </Td>
        <Td textAlign="center" onClick={onOpenDetailPengujian}>
          <Badge
            w="full"
            colorScheme={
              pengujian.file_result_pengujian !== null ? 'green' : 'pink'
            }
            px="4"
            py="2"
          >
            {pengujian.file_result_pengujian !== null ? 'Done' : 'On Progress'}
          </Badge>
        </Td>
        <Td textAlign="center">
          <IconButton
            isDisabled={pengujian.file_result_pengujian !== null ? false : true}
            onClick={() =>
              router.push(
                `${baseUrl}view-result/download/${pengujian.file_result_pengujian}`
              )
            }
            variant="outline"
            colorScheme="facebook"
            aria-label="download result"
            icon={<FiDownload size={20} />}
          />
        </Td>
      </Tr>
      <DetailTeknisiProgressFrontliner
        id={pengujian.id}
        isOpen={isOpenTeknisiProgress}
        onClose={onCloseTeknisiProgress}
      />
      <DetailTahapPengerjaan
        id={pengujian.id}
        isOpen={isOpenDetailPengujian}
        onClose={onCloseDetailPengujian}
      />
    </>
  );
};

export default TableSelesaiPemesananManager;
