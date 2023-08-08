import { Td, Tr } from '@chakra-ui/react';
import React from 'react';

const TableDataTeknisi = ({ teknisi }) => {
  return (
    <Tr>
      <Td textAlign="center">{teknisi.full_name}</Td>
      <Td textAlign="center">{teknisi.email}</Td>
      <Td textAlign="center">{teknisi.no_whatsapp}</Td>
      <Td textAlign="center">{teknisi.TeknisiPengujians.length}</Td>
      <Td textAlign="center">lihat</Td>
      <Td textAlign="center">penugasan</Td>
    </Tr>
  );
};

export default TableDataTeknisi;
