import React, { useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
  Icon,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Skeleton,
  Card,
  SkeletonText,
  TableContainer,
} from '@chakra-ui/react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { getServerSidePropsCostumer } from '../utils/getServerSidePropsCostumer';
import useRemoteCategoriesClient from '../components/hooks/remote/useRemoteCategoriesClient';
import useRemotePengujianClient from '../components/hooks/remote/useRemotePengujianClient';
import { ChevronDownIcon } from '@chakra-ui/icons';
import MainPenugujianCardGrid from '../components/main/mainPengujianCardGrid';
import MainCardPengujian from '../components/main/mainCardPengujian';
import ButtonTab from '../components/core/ButtonTab';
import MessageSearchNotFound from '../utils/MessageSearchNotFound';

const HomeDashboard = () => {
  const [searchText, setSearchText] = useState('');
  const [filterTempatPengujian, setFilterTempatPengujian] = useState('');

  const [dataCat, setDataCat] = useState('Pengujian Aspal');
  const { data: dataCategoryClient, isLoading: isLoadingCategoryClient } =
    useRemoteCategoriesClient();

  const {
    data: dataPengujianClient,
    isLoading: isLoadingPengujianClient,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRemotePengujianClient({
    page: 1,
    limit: 10,
    search: searchText,
    category: dataCat,
    tempat_pengujian: filterTempatPengujian,
  });

  return (
    <VStack align="stretch">
      <Head>
        <title>Halaman Utama | Lateksil</title>
      </Head>
      <Box borderBottomWidth={2}>
        <TableContainer>
          <HStack
            align="center"
            justify={{ base: 'start', md: 'center' }}
            spacing={5}
          >
            {dataCategoryClient &&
              dataCategoryClient?.data?.map((category, i) => (
                <React.Fragment key={i}>
                  <ButtonTab
                    label={dataCat}
                    value={category.name_category}
                    onClick={() => setDataCat(category.name_category)}
                  >
                    {category.name_category}
                  </ButtonTab>
                </React.Fragment>
              ))}
            {isLoadingCategoryClient && (
              <HStack spacing="6" overflow="hidden" justify="center">
                <Skeleton w="200px" h="50px" />
                <Skeleton w="200px" h="50px" />
                <Skeleton w="200px" h="50px" />
                <Skeleton w="200px" h="50px" />
              </HStack>
            )}
          </HStack>
        </TableContainer>
        <Flex justify="center" pb="6" mt="4">
          <Flex w="full" maxW="3xl">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiSearch />
              </InputLeftElement>
              {searchText !== '' && (
                <InputRightElement>
                  <Icon
                    cursor="pointer"
                    as={AiOutlineClose}
                    onClick={() => setSearchText('')}
                  />
                </InputRightElement>
              )}
              <Input
                type="text"
                placeholder={`Cari ${dataCat}`}
                variant="outline"
                bg="#f5f5f5"
                _placeholder={{ color: '#45414180' }}
                onChange={(state) => setSearchText(state.target.value)}
                value={searchText}
              />
            </InputGroup>
            <Box ml="3">
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {filterTempatPengujian === ''
                    ? 'Semua'
                    : filterTempatPengujian}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => setFilterTempatPengujian('')}>
                    Semua
                  </MenuItem>
                  <MenuItem
                    onClick={() => setFilterTempatPengujian('Laboratorium')}
                  >
                    Laboratorium
                  </MenuItem>
                  <MenuItem
                    onClick={() => setFilterTempatPengujian('Lapangan')}
                  >
                    Lapangan
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Flex>
      </Box>
      <VStack align="stretch" mx="auto" spacing="4">
        <Text fontSize="xl" fontWeight="semibold">
          {dataCat}
        </Text>
        <MainPenugujianCardGrid>
          {dataPengujianClient?.pages.map((page) =>
            page.data?.map((pengujian, index) => (
              <>
                <MainCardPengujian
                  key={index}
                  pengujian={pengujian}
                  isLoading={isLoadingPengujianClient}
                />
              </>
            ))
          )}

          {isLoadingPengujianClient && (
            <>
              <Card bg="white" shadow="md">
                <Skeleton h="40" />
                <VStack py="2" px="4" align="stretch">
                  <SkeletonText />
                  <Skeleton w="25%" h="2" />
                  <Skeleton w="40%" h="2" />
                </VStack>
              </Card>
              <Card bg="white" shadow="md">
                <Skeleton h="40" />
                <VStack py="2" px="4" align="stretch">
                  <SkeletonText />
                  <Skeleton w="25%" h="2" />
                  <Skeleton w="40%" h="2" />
                </VStack>
              </Card>
              <Card bg="white" shadow="md">
                <Skeleton h="40" />
                <VStack py="2" px="4" align="stretch">
                  <SkeletonText />
                  <Skeleton w="25%" h="2" />
                  <Skeleton w="40%" h="2" />
                </VStack>
              </Card>
              <Card bg="white" shadow="md">
                <Skeleton h="40" />
                <VStack py="2" px="4" align="stretch">
                  <SkeletonText />
                  <Skeleton w="25%" h="2" />
                  <Skeleton w="40%" h="2" />
                </VStack>
              </Card>
              <Card bg="white" shadow="md">
                <Skeleton h="40" />
                <VStack py="2" px="4" align="stretch">
                  <SkeletonText />
                  <Skeleton w="25%" h="2" />
                  <Skeleton w="40%" h="2" />
                </VStack>
              </Card>
            </>
          )}
        </MainPenugujianCardGrid>
      </VStack>
      {dataPengujianClient?.pages[0].data === null && <MessageSearchNotFound />}
      <Flex justify="center" py="2">
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Loading...'
              : hasNextPage
              ? 'Load more'
              : 'Nothing more to load'}
          </Button>
        )}
      </Flex>
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsCostumer;

HomeDashboard.getLayout = (page) => (
  <DashboardLayout sidebarFor="users">{page}</DashboardLayout>
);

export default HomeDashboard;
