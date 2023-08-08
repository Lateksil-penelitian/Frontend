import {
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  Table,
  TableContainer,
  TabList,
  Tabs,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import React, { useMemo, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Select from '../../components/core/select';
import { generateEntryOptions } from '../../components/core/select/helper/entryOptions';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DashboardPagination from '../../components/dashboard/DashboardPagination';
import LoadingData from '../../utils/LoadingData';
import MessageNotFoundData from '../../utils/MessageNotFoundData';
import { TransactionTypes } from '../../utils/enum/TransactionTypes';
import { getServerSidePropsManager } from '../../utils/getServerSidePropsManager';
import useRemoteOrdersManager from '../../components/hooks/remote/useRemoteOrdersManager';
import TablePersetujuanPesanan from '../../components/tables/managerTable/TablePersetujuanPesanan';

const PersetujuanPesanan = () => {
  const showEntryOptions = useMemo(() => generateEntryOptions(), []);
  const [statusPersetujuan, setStatusPesetujuan] = useState('1');

  const {
    data: dataOrders,
    isLoading: isLoadingOrders,
    isSuccess: isSuccessOrder,
  } = useRemoteOrdersManager({
    status_persetujuan: statusPersetujuan,
  });

  return (
    <VStack align="stretch">
      <Head>
        <title>Persetujuan Pesanan | Lateksil</title>
      </Head>
      <HStack borderBottomWidth="1px" pb="4">
        <Text color="blue.700" fontWeight="bold" fontSize="xl">
          Persetujuan Pesanan
        </Text>
      </HStack>
      <Tabs variant="line" isFitted>
        <TabList color="gray.500">
          <Tab
            _hover={{ bg: 'gray.100' }}
            _selected={{ color: 'white', bg: 'blue.700' }}
            onClick={() => setStatusPesetujuan(TransactionTypes.WAITING)}
          >
            Proses Persetujuan
          </Tab>
          <Tab
            _hover={{ bg: 'gray.100' }}
            _selected={{ color: 'white', bg: 'blue.700' }}
            onClick={() => setStatusPesetujuan(TransactionTypes.ACCEPT)}
          >
            Diterima
          </Tab>
          <Tab
            _hover={{ bg: 'gray.100' }}
            _selected={{ color: 'white', bg: 'blue.700' }}
            onClick={() => setStatusPesetujuan(TransactionTypes.CANCELED)}
          >
            Dibatalkan
          </Tab>
        </TabList>
        <InputGroup my="5">
          <InputLeftElement pointerEvents="none">
            <FiSearch />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Cari Pengajuan Pemesanan"
            variant="outline"
            shadow="none"
            _placeholder={{ color: '#45414180' }}
          />
        </InputGroup>
        <TableContainer>
          <Table size="md" variant="striped">
            <Thead>
              <Tr>
                <Th textAlign="center">Nama Pelanggan</Th>
                <Th textAlign="center">Nama Proyek</Th>
                <Th textAlign="center">Tanggal Pendaftaran</Th>
                <Th textAlign="center" isNumeric>
                  Total Harga
                </Th>
                <Th textAlign="center">Tanggal Mulai</Th>
                <Th textAlign="center">Tanggal Selesai</Th>
                {statusPersetujuan === TransactionTypes.WAITING ? (
                  <Th textAlign="center">Aksi</Th>
                ) : (
                  <Th textAlign="center">Status Persetujuan</Th>
                )}
              </Tr>
            </Thead>
            <Tbody>
              {isSuccessOrder &&
                dataOrders?.data?.map((order) => (
                  <TablePersetujuanPesanan key={order.id} order={order} />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Tabs>
      {isLoadingOrders && <LoadingData />}
      {dataOrders?.totalData === 0 ? (
        <MessageNotFoundData />
      ) : (
        <Flex
          flexDir={{ base: 'column', md: 'row', xl: 'row' }}
          justifyContent="space-between"
          borderTopWidth="1px"
          alignItems="center"
          py="2"
        >
          <Box display="flex" fontSize="sm" alignItems="center">
            <HStack>
              <Text>Show</Text>
              <Select
                isSearchable={false}
                options={showEntryOptions}
                defaultValue={showEntryOptions[0]}
                onChange={() => {}}
              />
              <Text>Entries</Text>
            </HStack>
          </Box>
          <DashboardPagination current={1} total={1} onPageClick={() => {}} />
        </Flex>
      )}
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsManager;

PersetujuanPesanan.getLayout = (page) => (
  <DashboardLayout sidebarFor="manager">{page}</DashboardLayout>
);

export default PersetujuanPesanan;
