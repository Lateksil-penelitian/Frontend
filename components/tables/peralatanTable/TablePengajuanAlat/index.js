import React, { useEffect, useState } from 'react';
import {
  Badge,
  Text,
  Button,
  Flex,
  Td,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import PengajuanAlatModal from '../../../modals/peralatanModal/PengajuanAlatModal';
import { BooleanType } from '../../../../utils/enum/BooleanType';

const TablePengajuanAlat = ({ pengujian }) => {
  const [dataNamaAlat, setDataNamaAlat] = useState([]);

  const {
    isOpen: isOpenPengajuanAlat,
    onOpen: onOpenPengajuanAlat,
    onClose: onClosePengajuanAlat,
  } = useDisclosure();

  useEffect(() => {
    const mergedArray = Array.from(
      new Set(
        pengujian?.itemOrders
          ?.map((pengujian) =>
            pengujian.Pengujian.peralatan.map((alat) => alat.nama_alat)
          )
          .flat()
      )
    );
    setDataNamaAlat(mergedArray);
  }, [pengujian.id]);

  return (
    <>
      <Tr>
        <Td>
          <Flex direction="column" w="full">
            <Text fontWeight="semibold">{pengujian.User?.full_name}</Text>
            <Text color="orange.blue">{pengujian.User?.company_name}</Text>
          </Flex>
        </Td>
        <Td textAlign="center">{pengujian.proyek?.nama_proyek}</Td>
        <Td textAlign="center">{pengujian.status_alat?.catatan_khusus}</Td>
        <Td>
          <Flex
            direction="column"
            w="100%"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="pre-wrap"
          >
            {pengujian.itemOrders?.map((pengujian, i) => (
              <Text key={i} borderBottom="1px solid black" p="1" mb="1">
                {pengujian.Pengujian.jenis_pengujian}
              </Text>
            ))}
          </Flex>
        </Td>
        <Td>
          <Flex
            direction="column"
            w="100%"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="pre-wrap"
          >
            {dataNamaAlat.map((alat, i) => (
              <Text key={i} borderBottom="1px solid black" p="1" mb="1">
                {alat}
              </Text>
            ))}
          </Flex>
        </Td>
        <Td textAlign="center">
          <Badge colorScheme="green" p="2" rounded="md" w="full">
            Lunas
          </Badge>
        </Td>
        <Td textAlign="center">
          <Button
            variant="lateksil-solid"
            isDisabled={
              pengujian.status_alat.status_peralatan === BooleanType.TRUE
                ? true
                : false
            }
            onClick={onOpenPengajuanAlat}
          >
            {pengujian.status_alat.status_peralatan === BooleanType.TRUE
              ? 'Terkirim'
              : 'Siapkan'}
          </Button>
        </Td>
      </Tr>
      <PengajuanAlatModal
        id={pengujian.id}
        isOpen={isOpenPengajuanAlat}
        onClose={onClosePengajuanAlat}
      />
    </>
  );
};

export default TablePengajuanAlat;
