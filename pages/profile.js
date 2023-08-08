import React from 'react';
import {
  Heading,
  Avatar,
  Box,
  Image,
  Flex,
  Text,
  Stack,
  Button,
} from '@chakra-ui/react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { getServerSidePropsCostumer } from '../utils/getServerSidePropsCostumer';

const ProfileUser = () => {
  return (
    <Box
      w={{ base: '100%', md: '50%' }}
      boxShadow={'md'}
      rounded={'md'}
      overflow={'hidden'}
    >
      <Image
        h={'190px'}
        w={'full'}
        src={
          'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
        }
        objectFit="cover"
        alt="#"
      />
      <Flex justify={'center'} mt={-12}>
        <Avatar
          size={'xl'}
          src={
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
          }
          css={{
            border: '2px solid white',
          }}
        />
      </Flex>

      <Box p={6}>
        <Stack spacing={0} align={'center'} mb={5}>
          <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
            Deva Aji Saputra
          </Heading>
          <Text color={'gray.500'}>PT. Cinta Sejati</Text>
        </Stack>

        <Stack direction={'row'} justify={'center'} spacing={6}>
          <Stack spacing={0} align={'center'}>
            <Text fontSize={'sm'} color={'gray.500'}>
              email:
            </Text>
            <Text fontWeight={600}>devaaji5@gmail.com</Text>
          </Stack>
        </Stack>
        <Stack direction={'row'} mt="5" justify={'center'} spacing={6}>
          <Stack spacing={0} align={'center'}>
            <Text fontSize={'sm'} color={'gray.500'}>
              No WhatsApp:
            </Text>
            <Text fontWeight={500}>08679111476</Text>
          </Stack>
        </Stack>
        <Stack direction={'row'} mt="5" justify={'center'} spacing={6}>
          <Stack spacing={0} align={'center'}>
            <Text fontSize={'sm'} color={'gray.500'}>
              Alamat:
            </Text>
            <Text fontWeight={300}>Jln. Branti Raya Desa Pejambon ...</Text>
          </Stack>
        </Stack>

        <Button
          w={'full'}
          mt={8}
          bg="lateksil-main-2"
          color={'white'}
          rounded={'md'}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
        >
          Ubah
        </Button>
      </Box>
    </Box>
  );
};

export const getServerSideProps = getServerSidePropsCostumer;

ProfileUser.getLayout = (page) => (
  <DashboardLayout sidebarFor="users">{page}</DashboardLayout>
);

export default ProfileUser;
