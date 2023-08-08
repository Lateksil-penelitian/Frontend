import React, { useEffect, useMemo, useRef, useState } from 'react';
import Head from 'next/head';

import {
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';

import { FiSearch } from 'react-icons/fi';
import { generateEntryOptions } from '../../components/core/select/helper/entryOptions';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DashboardPagination from '../../components/dashboard/DashboardPagination';
import { getServerSidePropsManager } from '../../utils/getServerSidePropsManager';
import Select from '../../components/core/select';
import useRemoteSelesaiPemesanan from '../../components/hooks/remote/useRemoteSelesaiPemesanan';
import MessageNotFoundData from '../../utils/MessageNotFoundData';
import LoadingData from '../../utils/LoadingData';
import TableSelesaiPemesananManager from '../../components/tables/managerTable/TableSelesaiPesanan';

const SelesaiPemesanan = () => {
  const showEntryOptions = useMemo(() => generateEntryOptions(), []);

  const SelesaiPemesananManagerRef = useRef(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [dataLimit, setDataLimit] = useState(10);

  const {
    data: dataSelesaiPemesanan,
    isLoading: isLoadingSelesaiPemesanan,
    error,
  } = useRemoteSelesaiPemesanan({
    page: pageIndex,
    limit: dataLimit,
  });

  useEffect(() => {
    setPageIndex(1);
  }, [dataLimit]);

  useEffect(() => {
    if (error == null && pageIndex > 1) setPageIndex(pageIndex - 1);
  }, [error]);

  const handlePageClick = (page) => {
    setPageIndex(page);

    if (SelesaiPemesananManagerRef && SelesaiPemesananManagerRef.current) {
      SelesaiPemesananManagerRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <VStack align="stretch" spacing={5}>
      <Head>
        <title>Selesai Pemesanan | Lateksil</title>
      </Head>
      <HStack borderBottomWidth="1px" pb="6">
        <Text color="blue.700" fontWeight="bold" fontSize="xl">
          Selesai Pemesanan
        </Text>
        <Spacer />
      </HStack>
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
        <InputGroup maxW="xs">
          <InputLeftElement pointerEvents="none">
            <FiSearch />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search..."
            variant="outline"
            shadow="none"
            // onChange={(e) => setSearchInput(e.target.value)}
            // onKeyPress={handleSearchKeypress}
          />
        </InputGroup>
      </HStack>
      <TableContainer>
        <Table size="md" variant="striped">
          <Thead>
            <Tr>
              <Th textAlign="center">Nama Pelanggan</Th>
              <Th textAlign="center">Nama Proyek</Th>
              <Th textAlign="center">No Surat</Th>
              <Th textAlign="center">Teknisi</Th>
              <Th textAlign="center">Progress</Th>
              <Th textAlign="center">Result</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataSelesaiPemesanan?.data?.map((pengujian, i) => (
              <TableSelesaiPemesananManager pengujian={pengujian} key={i} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {dataSelesaiPemesanan?.totalData === 0 && <MessageNotFoundData />}
      {isLoadingSelesaiPemesanan && <LoadingData />}
      <Flex
        flexDir={{ base: 'column', md: 'row', xl: 'row' }}
        justifyContent="end"
        borderTopWidth="1px"
        alignItems="center"
        py="2"
      >
        <DashboardPagination
          current={pageIndex}
          total={dataSelesaiPemesanan ? dataSelesaiPemesanan?.totalPages : 0}
          onPageClick={handlePageClick}
        />
      </Flex>
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsManager;

SelesaiPemesanan.getLayout = (page) => (
  <DashboardLayout sidebarFor="manager">{page}</DashboardLayout>
);

export default SelesaiPemesanan;
