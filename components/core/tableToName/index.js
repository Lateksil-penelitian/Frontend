import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import React from 'react';

const TableToName = ({ label, value, ...props }) => {
  return (
    <HStack mt="1" w="full" align="flex-start">
      <Box fontSize="sm" w="150px">
        <Flex justify="space-between">
          <Text>{label}</Text>
          <Text>:</Text>
        </Flex>
      </Box>
      <Box fontSize="sm" w="250px" wordBreak="break-word" {...props}>
        <Text fontWeight="semibold">{value === null ? '-' : value}</Text>
      </Box>
    </HStack>
  );
};

export default TableToName;
