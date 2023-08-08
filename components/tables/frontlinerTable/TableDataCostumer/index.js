import { Badge, Td, Tr } from '@chakra-ui/react';
import React from 'react';

const TableDataCostumer = ({ user }) => {
  return (
    <Tr>
      <Td textAlign="center">{user.full_name}</Td>
      <Td textAlign="center">{user.company_name}</Td>
      <Td textAlign="center">{user.email}</Td>
      <Td textAlign="center">{user.no_whatsapp}</Td>
      <Td textAlign="center" w="20%">
        {user.address}
      </Td>
      <Td textAlign="center">
        <Badge
          colorScheme={user.isActive_payment === 'active' ? 'green' : 'red'}
          rounded="md"
          px={3}
          py={1}
        >
          {user.isActive_payment}
        </Badge>
      </Td>
    </Tr>
  );
};

export default TableDataCostumer;
