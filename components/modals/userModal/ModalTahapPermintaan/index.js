import React from 'react';
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import formatCurrency from '../../../../utils/formatCurrently';
import useRemoteOrderById from '../../../hooks/remote/useRemoteOrderById';
import { TransactionTypes } from '../../../../utils/enum/TransactionTypes';
import { BooleanType } from '../../../../utils/enum/BooleanType';

const ModalTahapPermintaan = ({ order, isOpen, onClose }) => {
  const {
    data: dataDetailOrder,
    isSuccess,
    isLoading: isLoadingDetailOrder,
  } = useRemoteOrderById({ id: order.id });

  const detailOrder = dataDetailOrder?.data;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      size="3xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent mx="4" overflow="hidden">
        <ModalCloseButton />
        <ModalHeader>
          <Text>Detail Pemesanan</Text>
        </ModalHeader>
        <ModalBody>
          <Stack pb="10">
            {isLoadingDetailOrder ? (
              <Center my="1">
                <Spinner />
              </Center>
            ) : (
              <VStack>
                <Flex w="full" borderBottomWidth={2} py="2">
                  <Text fontWeight="semibold">Status Pemesanan</Text>
                  <Spacer />
                  {detailOrder.status.status_transaction ===
                    TransactionTypes.WAITING && (
                    <Badge
                      ml="3"
                      colorScheme="orange"
                      rounded="md"
                      px={3}
                      py={1}
                    >
                      Waiting
                    </Badge>
                  )}
                  {detailOrder.status.status_transaction ===
                    TransactionTypes.ACCEPT && (
                    <>
                      <Badge
                        ml="3"
                        colorScheme="green"
                        rounded="md"
                        px={3}
                        py={1}
                      >
                        Accepted
                      </Badge>
                      <Badge
                        ml="3"
                        colorScheme={
                          detailOrder.status.status_payment ===
                          BooleanType.FALSE
                            ? 'gray'
                            : 'green'
                        }
                        rounded="md"
                        px={3}
                        py={1}
                      >
                        {detailOrder.status.status_payment === BooleanType.FALSE
                          ? 'Belum Bayar'
                          : 'Sudah Bayar'}
                      </Badge>
                    </>
                  )}
                  {detailOrder.status.status_transaction ===
                    TransactionTypes.IN_PROGRESS && (
                    <>
                      <Badge
                        ml="3"
                        colorScheme="green"
                        rounded="md"
                        px={3}
                        py={1}
                      >
                        Accepted
                      </Badge>
                      <Badge
                        ml="3"
                        colorScheme={
                          detailOrder.status.status_payment ===
                          BooleanType.FALSE
                            ? 'gray'
                            : 'green'
                        }
                        rounded="md"
                        px={3}
                        py={1}
                      >
                        {detailOrder.status.status_payment === BooleanType.FALSE
                          ? 'Belum Bayar'
                          : 'Sudah Bayar'}
                      </Badge>
                    </>
                  )}
                  {detailOrder.status.status_transaction ===
                    TransactionTypes.CANCELED && (
                    <Badge ml="3" colorScheme="red" rounded="md" px={3} py={1}>
                      Canceled
                    </Badge>
                  )}
                </Flex>
                <Box w="full" py="2">
                  {detailOrder.status.status_transaction ===
                    TransactionTypes.WAITING && (
                    <Text fontWeight="semibold" color="yellow.600">
                      Pada Tahap ini sedang Menunggu Persetujuan, Mohon ditunggu
                      ya.
                    </Text>
                  )}
                  {detailOrder.status.status_transaction ===
                    TransactionTypes.ACCEPT &&
                    detailOrder.status.status_payment === BooleanType.FALSE && (
                      <Text fontWeight="semibold">
                        Dimohon Pelanggan untuk segera membayar untuk
                        melanjutkan proses selanjutnya, Terimakasih.
                      </Text>
                    )}
                  {detailOrder.status.status_transaction ===
                    TransactionTypes.ACCEPT &&
                    detailOrder.status.status_payment === BooleanType.TRUE && (
                      <>
                        <Text as="span" fontWeight="semibold">
                          DiMohon Pelanggan Atas Nama{' '}
                          {detailOrder.User.full_name} dari Perusahaan{' '}
                          {detailOrder.User.company_name} untuk menuggu{' '}
                        </Text>
                        <Text
                          as="span"
                          fontWeight="bold"
                          color="green.600"
                          fontSize="large"
                          textDecoration="underline"
                        >
                          Verifikasi Pembayaran{' '}
                        </Text>
                        <Text as="span" fontWeight="semibold">
                          Terimakasih
                        </Text>
                      </>
                    )}
                  {detailOrder.status.status_transaction ===
                    TransactionTypes.IN_PROGRESS &&
                    detailOrder.status.status_payment === BooleanType.TRUE && (
                      <>
                        <Text as="span" fontWeight="semibold">
                          Kami sedang Mengerjakan Pesanan kamu, Mohon untuk
                          menunggu sampai proses selesai
                        </Text>
                        <Text as="span" fontWeight="semibold">
                          {' '}
                          Terimakasih
                        </Text>
                      </>
                    )}
                  {detailOrder.status.status_transaction ===
                    TransactionTypes.CANCELED && (
                    <Box>
                      <Text>
                        Mohon Maaf Atas Nama {detailOrder.User.full_name} dari
                        Perusahaan {detailOrder.User.company_name}, Keterangan
                      </Text>{' '}
                      <Text as="span" fontWeight="semibold" color="red.600">
                        Ditolak
                      </Text>{' '}
                      Karena
                      <Text as="span" color="red.600" fontWeight="semibold">
                        {' '}
                        &quot; {detailOrder.proyek.keterangan_to_client} &quot;
                      </Text>
                    </Box>
                  )}
                </Box>
                <Box w="full" borderBottomWidth={2} py="2">
                  <Text fontWeight="semibold">Detail Produk</Text>
                </Box>
                <HStack mt="1" w="full" align="flex-start">
                  <Box fontSize="sm" w="150px">
                    <Flex justify="space-between">
                      <Text>Nama Proyek</Text>
                      <Text>:</Text>
                    </Flex>
                  </Box>
                  <Box fontSize="sm" w="250px" wordBreak="break-word">
                    <Text fontWeight="semibold">
                      {detailOrder.proyek.nama_proyek}
                    </Text>
                  </Box>
                </HStack>
                <HStack mt="1" w="full" align="flex-start">
                  <Box fontSize="sm" w="150px">
                    <Flex justify="space-between">
                      <Text>Tujuan Pengujian</Text>
                      <Text>:</Text>
                    </Flex>
                  </Box>
                  <Box fontSize="sm" w="250px" wordBreak="break-word">
                    <Text fontWeight="semibold">
                      {detailOrder.proyek.tujuan_proyek}
                    </Text>
                  </Box>
                </HStack>
                <TableContainer w="full">
                  <Table size="sm" variant="striped" colorScheme="facebook">
                    <Thead>
                      <Tr>
                        <Th>Jenis Pengujian</Th>
                        <Th isNumeric>Harga Satuan</Th>
                        <Th textAlign="center">Pengujian</Th>
                        <Th textAlign="center">jumlah</Th>
                        <Th isNumeric>Total</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {isSuccess &&
                        detailOrder.itemOrders.map((item, i) => (
                          <Tr key={i}>
                            <Td>
                              <Flex direction="column">
                                <Text fontWeight="semibold">
                                  {item.Pengujian.jenis_pengujian}
                                </Text>
                                <Text>{item.Pengujian.code}</Text>
                              </Flex>
                            </Td>
                            <Td isNumeric>
                              Rp{formatCurrency(item.Pengujian.price)}
                            </Td>
                            <Td textAlign="center">
                              {item.Pengujian.tempat_pengujian}
                            </Td>
                            <Td textAlign="center">
                              {item.OrderPengujian.quantity}{' '}
                              {item.Pengujian.sampler}
                            </Td>
                            <Td isNumeric fontWeight="semibold">
                              Rp
                              {formatCurrency(
                                parseInt(item.OrderPengujian.quantity) *
                                  parseInt(item.Pengujian.price)
                              )}
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </TableContainer>
                <Flex w="full" justify="end" py="3">
                  <Text fontSize="xl" fontWeight="bold">
                    Total Harga: Rp{formatCurrency(detailOrder.total_price)}
                  </Text>
                </Flex>
              </VStack>
            )}
          </Stack>
        </ModalBody>

        <ModalFooter bg="gray.100">
          <ButtonGroup>
            <Button onClick={onClose} border="1px">
              Tutup
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalTahapPermintaan;
