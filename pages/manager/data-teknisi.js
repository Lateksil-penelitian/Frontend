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
import useRemoteDataTeknisi from '../../components/hooks/remote/useRemoteDataTeknisi';
import TableDataTeknisi from '../../components/tables/managerTable/TableDataTeknisi';
import { getServerSidePropsManager } from '../../utils/getServerSidePropsManager';
import LoadingData from '../../utils/LoadingData';
import MessageNotFoundData from '../../utils/MessageNotFoundData';
import Select from '../../components/core/select';

const DataTeknisi = () => {
  const showEntryOptions = useMemo(() => generateEntryOptions(), []);

  const dataTeknisiRef = useRef(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [dataLimit, setDataLimit] = useState(10);

  const {
    data: dataAllTeknisi,
    isLoading: isLoadingDataAllTeknisi,
    error,
  } = useRemoteDataTeknisi({
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

    if (dataTeknisiRef && dataTeknisiRef.current) {
      dataTeknisiRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // console.log(dataAllTeknisi);
  return (
    <VStack align="stretch" spacing={5}>
      <Head>
        <title>Data Teknisi | Lateksil</title>
      </Head>
      <HStack borderBottomWidth="1px" pb="6">
        <Text color="blue.700" fontWeight="bold" fontSize="xl">
          Data Teknisi
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
              <Th textAlign="center">Nama Teknisi</Th>
              <Th textAlign="center">Email</Th>
              <Th textAlign="center">No. Telp</Th>
              <Th textAlign="center">Jumlah</Th>
              <Th textAlign="center">Riwayat Proyek</Th>
              <Th textAlign="center">Penugasan</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataAllTeknisi?.data.map((teknisi, i) => (
              <TableDataTeknisi teknisi={teknisi} key={i} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {dataAllTeknisi?.totalData === 0 && <MessageNotFoundData />}
      {isLoadingDataAllTeknisi && <LoadingData />}
      <Flex
        flexDir={{ base: 'column', md: 'row', xl: 'row' }}
        justifyContent="end"
        borderTopWidth="1px"
        alignItems="center"
        py="2"
      >
        <DashboardPagination
          current={pageIndex}
          total={dataAllTeknisi ? dataAllTeknisi?.totalPages : 0}
          onPageClick={handlePageClick}
        />
      </Flex>
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsManager;

DataTeknisi.getLayout = (page) => (
  <DashboardLayout sidebarFor="manager">{page}</DashboardLayout>
);

export default DataTeknisi;
