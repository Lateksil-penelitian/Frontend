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
import Head from 'next/head';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Select from '../../components/core/select';
import { generateEntryOptions } from '../../components/core/select/helper/entryOptions';
import PeralatanCreate from '../../components/create/peralatanCreate';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DashboardPagination from '../../components/dashboard/DashboardPagination';
import useRemotePeralatan from '../../components/hooks/remote/useRemotePeralatan';
import TableInputPeralatan from '../../components/tables/peralatanTable/TableInputPeralatan';
import { getServerSidePropsPeralatan } from '../../utils/getServerSidePropsPeralatan';
import LoadingData from '../../utils/LoadingData';

const InputPeralatan = () => {
  const showEntryOptions = useMemo(() => generateEntryOptions(), []);

  const peralatanRef = useRef(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [dataLimit, setDataLimit] = useState(10);

  const {
    data: dataPeralatan,
    isLoading: isLoadingPeralatan,
    isSuccess,
    error,
  } = useRemotePeralatan({
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

    if (peralatanRef && peralatanRef.current) {
      peralatanRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <VStack align="stretch" spacing={4}>
      <Head>
        <title>Input Peralatan | Lateksil</title>
      </Head>
      <PeralatanCreate />
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
              <Th textAlign="center">Jenis Pengujian</Th>
              <Th textAlign="center">kategori</Th>
              <Th textAlign="center">Alat</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isSuccess &&
              dataPeralatan?.data.map((pengujian, i) => (
                <TableInputPeralatan pengujian={pengujian} key={i} />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      {isLoadingPeralatan && <LoadingData />}
      <Flex
        flexDir={{ base: 'column', md: 'row', xl: 'row' }}
        justifyContent="end"
        borderTopWidth="1px"
        alignItems="center"
        py="2"
      >
        <DashboardPagination
          current={1}
          total={dataPeralatan ? dataPeralatan?.totalPages : 0}
          onPageClick={handlePageClick}
        />
      </Flex>
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsPeralatan;

InputPeralatan.getLayout = (page) => (
  <DashboardLayout sidebarFor="peralatan">{page}</DashboardLayout>
);

export default InputPeralatan;
