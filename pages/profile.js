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
  useDisclosure,
} from '@chakra-ui/react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import useRemoteUserProfile from '../components/hooks/remote/useRemoteUserProfile';
import { getServerSideWithAllAuth } from '../utils/getServerSideWithAllAuth';
import ModalUpdateProfile from '../components/modals/userModal/ModalUpdateProfile';
import { baseUrl } from '../libs/axios';

const ProfileUser = () => {
  const { data: userProfileData } = useRemoteUserProfile();

  const {
    isOpen: isOpenUpdateProfile,
    onOpen: onOpenUpdateProfile,
    onClose: onCloseUpdateProfile,
  } = useDisclosure();
  return (
    <>
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
            src={`${baseUrl}profile/${userProfileData?.data?.image_profile}`}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {userProfileData?.data?.full_name}
            </Heading>
            <Text color={'gray.500'}>
              {userProfileData?.data?.company_name}
            </Text>
          </Stack>

          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontSize={'sm'} color={'gray.500'}>
                email:
              </Text>
              <Text fontWeight={600}>{userProfileData?.data?.email}</Text>
            </Stack>
          </Stack>
          <Stack direction={'row'} mt="5" justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontSize={'sm'} color={'gray.500'}>
                No WhatsApp:
              </Text>
              <Text fontWeight={500}>{userProfileData?.data?.no_whatsapp}</Text>
            </Stack>
          </Stack>
          <Stack direction={'row'} mt="5" justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontSize={'sm'} color={'gray.500'}>
                Alamat:
              </Text>
              <Text fontWeight={300}>{userProfileData?.data?.address}</Text>
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
            onClick={onOpenUpdateProfile}
          >
            Ubah
          </Button>
        </Box>
      </Box>
      <ModalUpdateProfile
        data={userProfileData?.data}
        isOpen={isOpenUpdateProfile}
        onClose={onCloseUpdateProfile}
      />
    </>
  );
};

export const getServerSideProps = getServerSideWithAllAuth;

ProfileUser.getLayout = (page) => (
  <DashboardLayout sidebarFor="users">{page}</DashboardLayout>
);

export default ProfileUser;
