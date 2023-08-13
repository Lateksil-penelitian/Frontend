import React from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Spinner,
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
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { getServerSidePropsKeuangan } from '../../utils/getServerSidePropsKeuangan';
import CreateNewMethodTransaction from '../../components/create/keuanganCreate/createMethodTransaction';
import TableMetodePembayaran from '../../components/tables/keuanganTable/TableMetodePembayaran';
import useRemoteMethodTransactionAll from '../../components/hooks/remote/useRemoteMethodTransactionAll';

const MethodPaymnet = () => {
  const { data: dataMetodePembayaran, isLoading: isLoadingMetodePembayaran } =
    useRemoteMethodTransactionAll({
      page: 1,
      limit: 10,
      search: '',
    });

  return (
    <VStack align="stretch" spacing={4}>
      <Head>
        <title>Metode Pembayaran | Lateksil</title>
      </Head>
      <CreateNewMethodTransaction />
      <Flex gap={5}>
        <Box flex={2} borderWidth={1}>
          <TableContainer>
            <Table size="md" variant="striped">
              <Thead>
                <Tr>
                  <Th textAlign="center">Tujuan Bank</Th>
                  <Th textAlign="center">Nama Lengkap</Th>
                  <Th textAlign="center">Type Transaction</Th>
                  <Th textAlign="center">No. Rekening</Th>
                  <Th textAlign="center">Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dataMetodePembayaran?.data?.map((account, i) => (
                  <TableMetodePembayaran key={i} account={account} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          {isLoadingMetodePembayaran && (
            <Center my="6">
              <Spinner />
            </Center>
          )}
        </Box>
        <Box flex={1} h="full">
          <Box py="2">
            <Text fontSize="lg" fontWeight="semibold">
              Contoh Tampil Costumer :
            </Text>
          </Box>
          <Box flex="1" flexGrow="1" rounded="lg" shadow="md" overflow="hidden">
            <Flex direction="column">
              <VStack bg="#002855" color="white" px="5" pt="5">
                <HStack justify="space-between" w="full" h="full">
                  <Text fontWeight="semibold">Proses Pembayaran</Text>
                  <Box p="1" cursor="pointer" textDecoration="underline">
                    Kembali
                  </Box>
                </HStack>
                <Box position="relative" w="full" h="70px">
                  <Box
                    bg="white"
                    position="absolute"
                    shadow="base"
                    rounded="md"
                    bottom="-10"
                    w="full"
                    p="5"
                  >
                    <Text color="black" fontWeight="semibold">
                      Total
                    </Text>
                    <Text color="#002855" fontWeight="bold" fontSize="2xl">
                      Rpx.xxx.xxx
                    </Text>
                  </Box>
                </Box>
              </VStack>
              <Flex
                mt="20"
                direction="column"
                borderBottomWidth={1}
                pb="2"
                mx="5"
              >
                <>
                  <Text color="black" fontWeight="semibold">
                    Metode Pembayaran
                  </Text>
                  <Text color="black">Transfer</Text>
                </>
              </Flex>
              <Flex direction="column" borderBottomWidth={1} pb="2" m="5">
                <>
                  <Text color="black" fontWeight="semibold">
                    Bank Tujuan : XXXX
                  </Text>
                  <Text color="black" fontWeight="semibold">
                    Atas Nama : XXXX XXXXX XXXX
                  </Text>
                </>
              </Flex>
              <Flex direction="column" borderBottomWidth={1} pb="2" m="5">
                <>
                  <Text color="black">No Rekening</Text>
                  <Text color="#002855" fontWeight="semibold" fontSize="2xl">
                    XXXX XXXXX XXXX XXX
                  </Text>
                </>
              </Flex>
              <Flex direction="column" pb="2" m="5">
                <Button as="span" w="full">
                  Upload Bukti Pemabayaran
                </Button>
                <Button w="full" variant="lateksil-solid" mt="5">
                  Kirim Bukti Pembayaran
                </Button>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </VStack>
  );
};

export const getServerSideProps = getServerSidePropsKeuangan;

MethodPaymnet.getLayout = (page) => (
  <DashboardLayout sidebarFor="keuangan">{page}</DashboardLayout>
);

export default MethodPaymnet;
