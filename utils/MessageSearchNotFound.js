import React from 'react';

import NextImage from '../components/core/nextimage';
import { Box, Flex, Text } from '@chakra-ui/react';
import SearchNotFound from '.././assets/images/search-not-found.jpg';

const MessageSearchNotFound = () => {
  return (
    <Flex w="full" py="9" flexDir="column" align="center">
      <Box width={200} height={200}>
        <NextImage
          src={SearchNotFound}
          alt="Civil Engginering Illustration"
          layout="responsive"
          placeholder="blur"
        />
      </Box>
      <Text textAlign="center" fontWeight="semibold">
        Pencaharian Tidak Ditemukan? Silahkan Cari Lagi
      </Text>
    </Flex>
  );
};

export default MessageSearchNotFound;
