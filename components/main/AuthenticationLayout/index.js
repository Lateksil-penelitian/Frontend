import React from 'react';
import NextImage from '../../core/nextimage';
import LateksilImage from '../../../assets/images/civil-engginering.jpg';
import { Box, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';

const AuthenticationLayout = ({ children }) => {
  return (
    <Stack minH="100vh" direction={{ base: 'column-reverse', md: 'row' }}>
      <Flex
        flex={1}
        align="center"
        shadow="xl"
        p="5"
        direction="column"
        justifyContent="center"
      >
        <Heading size={{ base: 'md', md: 'xl' }} color="blue.700">
          LABORATORIUM TEKNIK SIPIL
        </Heading>
        <Text fontWeight="semibold">
          Laboratorium Pengujian Teknik Sipil UBL
        </Text>
        <Box h="max">
          <Link href="/">
            <NextImage
              src={LateksilImage}
              alt="Civil Engginering Illustration"
              width="326"
              height="345"
              layout="responsive"
              placeholder="blur"
            />
          </Link>
        </Box>
      </Flex>
      <Flex p={8} flex={1} align="center" justify="center" flexDir="column">
        {children}
      </Flex>
    </Stack>
  );
};

export default AuthenticationLayout;
