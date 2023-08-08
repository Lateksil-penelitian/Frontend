import React from 'react';

import NextImage from '../components/core/nextimage';
import { Box, Flex, Text } from '@chakra-ui/react';
import SearchNotFound from '.././assets/images/search-not-found.jpg';

const MessageDataNotFoundClient = ({ children }) => {
  return (
    <Flex w="full" py="9" flexDir="column" align="center">
      <Box width={200} height={150}>
        <NextImage
          src={SearchNotFound}
          alt="Data Masih Kosong"
          layout="responsive"
          placeholder="blur"
        />
      </Box>
      <Text textAlign="center" fontWeight="semibold">
        {children}
      </Text>
    </Flex>
  );
};

export default MessageDataNotFoundClient;
