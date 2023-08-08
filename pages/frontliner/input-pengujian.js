import {
  Box,
  Center,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Spinner,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import { useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import Select from '../../components/core/select';
import { generateEntryOptions } from '../../components/core/select/helper/entryOptions';
import CreateNewInputPengujian from '../../components/create/frontlinerCreate/CreateNewPengujian';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DashboardPagination from '../../components/dashboard/DashboardPagination';
import useRemotePengujian from '../../components/hooks/remote/useRemotePengujian';
import PengujianTableFrontliner from '../../components/tables/frontlinerTable/pengujianTable';
import { generateOptionTempatPengujian } from '../../utils/entryOptions/generateEntryPengujian';
import { getServerSidePropsFrontliner } from '../../utils/getServerSidePropsFrontliner';
import MessageNotFoundData from '../../utils/MessageNotFoundData';
import MessageSearchNotFound from '../../utils/MessageSearchNotFound';

const InputPengujian = () => {
  const showEntryOptions = useMemo(() => generateEntryOptions(), []);
  const showTempatPengujian = useMemo(
    () => generateOptionTempatPengujian(),
    []
  );
  const [pageIndex, setPageIndex] = useState(1);
  const [dataLimit, setDataLimit] = useState(10);

  const [filterTempatPengujian, setFilterTempatPengujian] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filter, setFilter] = useState('');

  const {
    data: dataPengujian,
    isLoading: isLoadingDataPengujian,
    error,
  } = useRemotePengujian({
    page: pageIndex,
    limit: dataLimit,
    search: filter ? filter.found : '',
    tempat_pengujian: filterTempatPengujian,
  });

  const pengujianListRef = useRef(null);

  useEffect(() => {
    setPageIndex(1);
  }, [dataLimit]);

  useEffect(() => {
    if (error == null && pageIndex > 1) setPageIndex(pageIndex - 1);
  }, [error]);

  const handlePageClick = (page) => {
    setPageIndex(page);

    if (pengujianListRef && pengujianListRef.current) {
      pengujianListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchKeypress = (e) => {
    if (e.key === 'Enter' && searchInput !== '') {
      setFilter((prev) => ({
        ...prev,
        found: searchInput,
      }));
    }
  };

  useEffect(() => {
    if (searchInput === '') {
      setFilter('');
    }
  }, [searchInput]);

  return (
    <VStack align="stretch">
      <Head>
        <title>Input Pengujian | Lateksil</title>
      </Head>
      <CreateNewInputPengujian />
      <HStack>
        <Text>Show</Text>
        <Select
          isSearchable={false}
          options={showEntryOptions}
          defaultValue={showEntryOptions[0]}
          onChange={(option) => setDataLimit(option.value)}
        />
        <Text>Entries</Text>
        <Spacer />
        <Box ml="3">
          <Select
            isSearchable={false}
            options={showTempatPengujian}
            defaultValue={showTempatPengujian[0]}
            onChange={(option) => setFilterTempatPengujian(option.value)}
          />
        </Box>
        <InputGroup maxW="xs">
          <InputLeftElement pointerEvents="none">
            <FiSearch />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search Pengujian..."
            variant="outline"
            shadow="none"
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleSearchKeypress}
          />
        </InputGroup>
      </HStack>
      <Box overflowX="auto">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th textAlign="center" w="30%">
                Jenis Pengujian
              </Th>
              <Th textAlign="center">Kategori Pengujian</Th>
              <Th textAlign="center">Deskripsi</Th>
              <Th textAlign="center" w="5%">
                Min Kuantitas
              </Th>
              <Th textAlign="center">Sampler</Th>
              <Th textAlign="center">Catatan Khusus</Th>
              <Th textAlign="center">Harga</Th>
              <Th textAlign="center">Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataPengujian?.data?.map((pengujian, i) => (
              <PengujianTableFrontliner key={i} pengujian={pengujian} />
            ))}
          </Tbody>
        </Table>
        {dataPengujian?.data === null && <MessageSearchNotFound />}
        {dataPengujian?.totalData === 0 && <MessageNotFoundData />}
        {isLoadingDataPengujian && (
          <Center my="6">
            <Spinner />
          </Center>
        )}
      </Box>
      <Flex
        flexDir={{ base: 'column', md: 'row', xl: 'row' }}
        justifyContent="end"
        borderTopWidth="1px"
        alignItems="center"
        py="2"
      >
        <DashboardPagination
          current={pageIndex}
          total={dataPengujian ? dataPengujian?.totalPages : 0}
          onPageClick={handlePageClick}
        />
      </Flex>
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsFrontliner;

InputPengujian.getLayout = (page) => (
  <DashboardLayout sidebarFor="frontliner">{page}</DashboardLayout>
);

export default InputPengujian;
