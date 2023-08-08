import React from 'react';
import NextLink from 'next/link';

import NextImage from '../components/core/nextimage';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import LateksilImage from '.././assets/images/testing-ilustrator.jpg';

const MessageClientNotFoundData = ({ isLogin = false }) => {
  if (isLogin)
    return (
      <Flex w="full" py="5" flexDir="column" align="center" my="10">
        <Box width={200} height={200}>
          <NextImage
            src={LateksilImage}
            alt="Civil Engginering Illustration"
            layout="responsive"
            placeholder="blur"
          />
        </Box>
        <Text textAlign="center" fontWeight="semibold">
          Keranjang Kosong? Silahkan Cari Pengujian
        </Text>
        <NextLink href="/">
          <Button w="full" mt="2">
            Cari Pengujian
          </Button>
        </NextLink>
      </Flex>
    );
  return (
    <Flex w="full" py="5" flexDir="column" align="center">
      <Box width={200} height={200}>
        <NextImage
          src={LateksilImage}
          alt="Civil Engginering Illustration"
          layout="responsive"
          placeholder="blur"
        />
      </Box>
      <Text textAlign="center" fontWeight="semibold">
        Belum Ada Pengujian? Silahkan Masuk Terlebih Dahulu
      </Text>
    </Flex>
  );
};

export default MessageClientNotFoundData;
