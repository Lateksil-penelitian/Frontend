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
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DashboardPagination from '../../components/dashboard/DashboardPagination';
import useRemotePeralatanOrderPengajuan from '../../components/hooks/remote/useRemotePeralatanOrderPengajuan';
import TablePengajuanAlat from '../../components/tables/peralatanTable/TablePengajuanAlat';
import { getServerSidePropsPeralatan } from '../../utils/getServerSidePropsPeralatan';
import LoadingData from '../../utils/LoadingData';

const PengajuanPeralatan = () => {
  const showEntryOptions = useMemo(() => generateEntryOptions(), []);

  const [pageIndex, setPageIndex] = useState(1);
  const [dataLimit, setDataLimit] = useState(10);

  const {
    data: dataPengajuanAlat,
    isLoading: isLoadingPengajuanAlat,
    isSuccess: isSuccessPengajuanAlat,
    error,
  } = useRemotePeralatanOrderPengajuan({
    page: pageIndex,
    limit: dataLimit,
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

  return (
    <VStack align="stretch" spacing={4}>
      <Head>
        <title>Pengajuan Peralatan | Lateksil</title>
      </Head>
      <HStack borderBottomWidth="1px" pb="4">
        <Text color="blue.700" fontWeight="bold" fontSize="2xl">
          Pesanan Pengajuan Peralatan
        </Text>
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
              <Th textAlign="center" w="20%">
                Jenis Pengujian
              </Th>
              <Th textAlign="center">Catatan Khusus</Th>
              <Th textAlign="center" w="20%">
                Alat Pengujian
              </Th>
              <Th textAlign="center">Status Pembayaran</Th>
              <Th textAlign="center">Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isSuccessPengajuanAlat &&
              dataPengajuanAlat?.data.map((pengujian, i) => (
                <TablePengajuanAlat key={i} pengujian={pengujian} />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      {isLoadingPengajuanAlat && <LoadingData />}
      <Flex
        flexDir={{ base: 'column', md: 'row', xl: 'row' }}
        justifyContent="end"
        borderTopWidth="1px"
        alignItems="center"
        py="2"
      >
        <DashboardPagination
          current={pageIndex}
          total={dataPengajuanAlat ? dataPengajuanAlat?.totalPages : 0}
          onPageClick={handlePageClick}
        />
      </Flex>
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsPeralatan;

PengajuanPeralatan.getLayout = (page) => (
  <DashboardLayout sidebarFor="peralatan">{page}</DashboardLayout>
);

export default PengajuanPeralatan;
