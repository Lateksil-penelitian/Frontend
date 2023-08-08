import React from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { useDashboard } from '../../../context/dashboard/DashboardProvider';
import DashboardUserNavbar from '../DashboardUserNavbar';
import useRemoteUserProfile from '../../hooks/remote/useRemoteUserProfile';
import { getServerSidePropsUsers } from '../../../utils/getServerSideUsers';

const DashboardNavbar = () => {
  const { isDesktopSidebarOpened, onSidebarToggle } = useDashboard();

  const {
    data: userProfileData,
    isSuccess,
    isLoading,
  } = useRemoteUserProfile();

  if (userProfileData)
    return (
      <Stack
        p="4"
        bg="white"
        borderBottomWidth="1px"
        alignItems={{
          base: 'stretch',
          md: isDesktopSidebarOpened ? 'stretch' : 'center',
          lg: 'center',
        }}
        direction={{
          base: 'column',
          md: isDesktopSidebarOpened ? 'column' : 'row',
          lg: 'row',
        }}
      >
        <HStack w="full">
          <Flex w="full">
            <Flex alignItems="center">
              <IconButton
                icon={<FiMenu />}
                variant="ghost"
                onClick={onSidebarToggle}
                aria-label="Menu"
              />
            </Flex>
            <Spacer />
            <HStack spacing={3}>
              {isSuccess && userProfileData && (
                <>
                  <Text fontSize="md" fontStyle="heading" fontWeight="bold">
                    Hi, {userProfileData.data?.full_name}
                  </Text>
                  <DashboardUserNavbar
                    userProfileData={userProfileData?.data}
                  />
                </>
              )}
              {isLoading && <Box>Loading...</Box>}
            </HStack>
          </Flex>
        </HStack>
      </Stack>
    );

  return (
    <Stack
      p="4"
      bg="white"
      borderBottomWidth="1px"
      alignItems={{
        base: 'stretch',
        md: isDesktopSidebarOpened ? 'stretch' : 'center',
        lg: 'center',
      }}
      direction={{
        base: 'column',
        md: isDesktopSidebarOpened ? 'column' : 'row',
        lg: 'row',
      }}
    >
      <HStack w="full">
        <Flex w="full">
          <Flex alignItems="center">
            <IconButton
              icon={<FiMenu />}
              variant="ghost"
              onClick={onSidebarToggle}
              aria-label="Menu"
            />
          </Flex>
          <Spacer />
          <HStack spacing={3}>
            <ButtonGroup>
              <NextLink href="/login" passHref>
                <Button bg="blue.700" color="white" _hover={{ bg: 'blue.800' }}>
                  Masuk
                </Button>
              </NextLink>
              <NextLink href="/register" passHref>
                <Button
                  variant="outline"
                  borderColor="blue.700"
                  color="blue.700"
                >
                  Daftar
                </Button>
              </NextLink>
            </ButtonGroup>
          </HStack>
        </Flex>
      </HStack>
    </Stack>
  );
};
export const getServerSideProps = getServerSidePropsUsers;

export default DashboardNavbar;
