import React from 'react';
import {
  Avatar,
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
  Icon,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FiLogOut, FiUsers } from 'react-icons/fi';
import useAuthUserStore from '../../../store/useAuthUserStore';
import { useRouter } from 'next/router';
import { FaBuilding } from 'react-icons/fa';
import { baseUrl } from '../../../libs/axios';

const DashboardUserNavbar = ({ userProfileData }) => {
  const router = useRouter();
  const removeUserStore = useAuthUserStore((state) => state.removeUser);

  const onLogout = async () => {
    await removeUserStore();
    router.push('/login');
  };
  return (
    <>
      <Menu placement="bottom-end" isLazy>
        <MenuButton aria-label="Options" bg="transparent" variant="ghost">
          <Box>
            <Avatar
              loading="lazy"
              variant="outline"
              src={`${baseUrl}profile/${userProfileData?.image_profile}`}
              name={userProfileData?.full_name}
              size={{ base: 'sm', md: 'md' }}
            />
          </Box>
        </MenuButton>
        <Portal>
          <MenuList zIndex={15}>
            <HStack m="3">
              <VStack alignItems="left">
                <HStack>
                  <Text
                    size="title-small"
                    fontStyle="heading"
                    fontWeight="bold"
                  >
                    {userProfileData?.full_name}
                  </Text>
                </HStack>
                <HStack>
                  <Icon as={FaBuilding} size="sm" />
                  <Text fontSize="sm" fontWeight="semibold" fontStyle="heading">
                    {userProfileData?.company_name}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            <MenuDivider />
            <NextLink href="/profile" passHref>
              <MenuItem as="a" icon={<FiUsers />}>
                Profil Pengguna
              </MenuItem>
            </NextLink>
            <MenuItem
              onClick={onLogout}
              icon={<FiLogOut color="ims-red" />}
              _hover={{ bg: 'red.100', fontWeight: 'semibold' }}
            >
              Keluar
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </>
  );
};

export default DashboardUserNavbar;
