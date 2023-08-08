import React, { useState } from 'react';
import { Flex, Td, Text, Tr, Icon, useDisclosure } from '@chakra-ui/react';
import { GrFormClose } from 'react-icons/gr';
import DeleteAlatModel from '../../../modals/peralatanModal/DeleteAlatModal';
import useToastNotification from '../../../hooks/useToastNotification';

const TableInputPeralatan = ({ pengujian }) => {
  const showToast = useToastNotification();
  const [idPeralatan, setIdPeralatan] = useState('');
  const {
    isOpen: isOpenDeleteAlat,
    onOpen: onOpenDeleteAlat,
    onClose: onCloseDeleteAlat,
  } = useDisclosure();

  const handleDeleteAlat = async (id) => {
    try {
      setIdPeralatan(id);
    } catch (error) {
      showToast('Server Sedang Bermasalah', 'error');
    } finally {
      onOpenDeleteAlat();
    }
  };

  return (
    <>
      <Tr>
        <Td>
          <Flex direction="column" w="full">
            <Text fontWeight="semibold">{pengujian.jenis_pengujian}</Text>
            <Text color="orange.600">{pengujian.code}</Text>
          </Flex>
        </Td>
        <Td textAlign="center">{pengujian.category}</Td>
        <Td textAlign="center">
          {pengujian.peralatan.map((alat, i) => (
            <Flex
              key={i}
              border="1px solid black"
              justify="space-between"
              rounded="md"
              p="2"
              shadow="sm"
              mb="1"
            >
              <Text>{alat.nama_alat}</Text>
              <Flex
                alignItems="center"
                onClick={() => handleDeleteAlat(alat.id)}
                mr={1}
                cursor="pointer"
              >
                <Icon as={GrFormClose} boxSize={5} />
              </Flex>
            </Flex>
          ))}
        </Td>
      </Tr>
      <DeleteAlatModel
        id={idPeralatan}
        isOpen={isOpenDeleteAlat}
        onClose={onCloseDeleteAlat}
      />
    </>
  );
};

export default TableInputPeralatan;
