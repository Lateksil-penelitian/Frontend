import {
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import React, { useEffect, useMemo, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Select from '../../components/core/select';
import { generateEntryOptions } from '../../components/core/select/helper/entryOptions';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DashboardPagination from '../../components/dashboard/DashboardPagination';
import useRemoteCostumer from '../../components/hooks/remote/useRemoteCostumer';
import TableDataCostumer from '../../components/tables/frontlinerTable/TableDataCostumer';
import { generateOptionStatusCostumer } from '../../utils/entryOptions/generateEntryCustumer';
import { getServerSidePropsFrontliner } from '../../utils/getServerSidePropsFrontliner';
import LoadingData from '../../utils/LoadingData';
import MessageSearchNotFound from '../../utils/MessageSearchNotFound';

const DataCostumer = () => {
  const showEntryOptions = useMemo(() => generateEntryOptions(), []);
  const showEntryStatus = useMemo(() => generateOptionStatusCostumer(), []);

  const [pageIndex, setPageIndex] = useState(1);
  const [dataLimit, setDataLimit] = useState(10);
  const [activeStatus, setActiveStatus] = useState('');

  const [searchInput, setSearchInput] = useState('');
  const [filter, setFilter] = useState('');

  const { data: dataCostumer, isLoading: isLoadingDataCostumer } =
    useRemoteCostumer({
      page: pageIndex,
      limit: dataLimit,
      search: filter ? filter.found : '',
      isActive: activeStatus,
    });

  useEffect(() => {
    setPageIndex(1);
  }, [dataLimit]);

  const handlePageClick = (page) => {
    setPageIndex(page);
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
    <VStack align="stretch" spacing={5}>
      <Head>
        <title>Data Costumer | Lateksil</title>
      </Head>
      <HStack borderBottomWidth="1px" pb="6">
        <Text color="blue.700" fontWeight="bold" fontSize="xl">
          Data Costumer
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
        <Box ml="3">
          <Select
            isSearchable={false}
            options={showEntryStatus}
            defaultValue={showEntryStatus[0]}
            onChange={(option) => setActiveStatus(option.value)}
          />
        </Box>
        <InputGroup maxW="xs">
          <InputLeftElement pointerEvents="none">
            <FiSearch />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search ..."
            variant="outline"
            shadow="none"
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleSearchKeypress}
          />
        </InputGroup>
      </HStack>
      <Box overflowX="auto" mt="5">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th textAlign="center">Nama Pelanggan</Th>
              <Th textAlign="center">Nama Perusahaan</Th>
              <Th textAlign="center">Email</Th>
              <Th textAlign="center">No. WhatsApp</Th>
              <Th textAlign="center">Alamat</Th>
              <Th textAlign="center">Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataCostumer &&
              dataCostumer?.data?.map((user, i) => (
                <TableDataCostumer key={i} user={user} />
              ))}
          </Tbody>
        </Table>
      </Box>
      {dataCostumer?.data === null && <MessageSearchNotFound />}
      {isLoadingDataCostumer ? (
        <LoadingData />
      ) : (
        <Flex
          flexDir={{ base: 'column', md: 'row', xl: 'row' }}
          justifyContent="end"
          borderTopWidth="1px"
          alignItems="center"
          py="2"
        >
          <DashboardPagination
            current={pageIndex}
            total={dataCostumer ? dataCostumer?.totalPages : 0}
            onPageClick={handlePageClick}
          />
        </Flex>
      )}
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsFrontliner;

DataCostumer.getLayout = (page) => (
  <DashboardLayout sidebarFor="frontliner">{page}</DashboardLayout>
);

export default DataCostumer;
