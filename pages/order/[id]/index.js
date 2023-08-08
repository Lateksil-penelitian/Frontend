import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  Flex,
  HStack,
  Text,
  VStack,
  Icon,
  Box,
  Badge,
  Spacer,
  ButtonGroup,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import download from 'downloadjs';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { baseUrl, fetcherWithContext } from '../../../libs/axios';
import { FaTasks, FaUser, FaWallet } from 'react-icons/fa';
import { AiOutlineLeft, AiOutlineProject } from 'react-icons/ai';
import formatCurrency from '../../../utils/formatCurrently';
import ParseDate from '../../../components/core/parseDate';
import StatusOrderTransaction from '../../../components/core/status/StatusOrderTransaction';
import { TransactionTypes } from '../../../utils/enum/TransactionTypes';
import { BooleanType } from '../../../utils/enum/BooleanType';
import useToastNotification from '../../../components/hooks/useToastNotification';
import ModalPayment from '../../../components/modals/userModal/ModalPayment';
import { useRouter } from 'next/router';

const DetailOrderPengujian = ({ order }) => {
  const router = useRouter();
  const showToast = useToastNotification();

  const {
    isOpen: isOpenPayment,
    onOpen: onOpenPayment,
    onClose: onClosePayment,
  } = useDisclosure();

  const {
    color: colorStatusTransaction,
    text: textStatusTransaction,
    color_ket: colorKetTransaction,
    text_ket: textKetTransaction,
  } = StatusOrderTransaction({
    status: order.status.status_transaction,
    message_canceled: order.proyek.keterangan_to_client,
  });

  const getFileExtension = (url) => {
    const extension = url.substring(url.lastIndexOf('.') + 1);
    return extension.toLowerCase();
  };

  const handleDownloadKwitansi = (data) => {
    const ImageURL = `${baseUrl}bukti-kwitansi/` + data;

    fetch(ImageURL)
      .then((response) => response.blob())
      .then((blob) => {
        const fileExtension = getFileExtension(ImageURL);
        const fileName = `bukti-${data}.${fileExtension}`;
        download(blob, fileName);
      })
      .catch(() => {
        showToast('Silahkan Download Lagi nanti', 'error');
      });
  };

  return (
    <React.Fragment>
      <VStack align="stretch" spacing={5}>
        <Head>
          <title>Daftar Transaksi | Lateksil</title>
        </Head>
        <HStack borderBottomWidth="1px" pb="4">
          <NextLink href={`/order`} passHref>
            <Flex align="center" gap={1} cursor="pointer">
              <Icon color="blue.700" w={5} h={5} as={AiOutlineLeft} />
              <Text color="blue.700" fontWeight="bold" fontSize="xl">
                Rincian Pesanan
              </Text>
            </Flex>
          </NextLink>
        </HStack>
        <HStack align="center">
          <Text fontSize={{ base: 'x-small', lg: 'sm' }}>
            Tanggal Pemesanan :{' '}
          </Text>
          <Text fontSize={{ base: 'x-small', lg: 'sm' }}>
            {ParseDate(order.createdAt)}
          </Text>
        </HStack>
        <Flex
          bg={`${colorStatusTransaction}.100`}
          rounded="md"
          direction="column"
          gap={3}
          borderBottomWidth="1px"
          p="4"
        >
          <Badge
            p="2"
            alignSelf="start"
            colorScheme={colorStatusTransaction}
            variant="outline"
            rounded="md"
          >
            {textStatusTransaction}
          </Badge>
          <Text color={colorKetTransaction}>{textKetTransaction}</Text>
        </Flex>
        <Flex direction="column">
          <Flex align="center" gap={2} borderBottomWidth="1px" pb="4">
            <Icon w={3} h={3} as={FaUser} />
            <Text fontWeight="semibold" fontSize={{ base: 'sm', lg: 'md' }}>
              Informasi Pelanggan
            </Text>
          </Flex>
          <Box mt="2" ml="5">
            <Text fontSize={{ base: 'sm', lg: 'md' }}>
              {order.User.company_name}
            </Text>
            <Text fontSize={{ base: 'sm', lg: 'md' }}>
              {order.User.full_name}
            </Text>
            <Text fontSize={{ base: 'sm', lg: 'md' }}>
              {order.User.no_whatsapp}
            </Text>
            <Text fontSize={{ base: 'sm', lg: 'md' }}>
              {order.User.address}
            </Text>
          </Box>
        </Flex>

        <Flex direction="column">
          <Flex align="center" gap={2} borderBottomWidth="1px" pb="4">
            <Icon w={3} h={3} as={AiOutlineProject} />
            <Text fontWeight="semibold" fontSize={{ base: 'sm', lg: 'md' }}>
              Proyek
            </Text>
          </Flex>
          <Box mt="2" ml="5">
            <Text fontSize="sm">Nama Pekerjaan </Text>
            <Text mr="2" fontWeight="bold" color="blue.700">
              {order.proyek.nama_proyek}
            </Text>
          </Box>
          <Box mt="2" ml="5">
            <Text fontSize="sm">Tujuan Proyek </Text>
            <Text mr="2" color="blue.700">
              {order.proyek.tujuan_proyek}
            </Text>
          </Box>
          {order.status.status_transaction === TransactionTypes.ACCEPT && (
            <Box mt="2" ml="5">
              <Text fontSize="sm">Tanggal Pengerjaan </Text>
              <Text mr="2" fontSize="sm">
                {ParseDate(order.proyek.tanggal_mulai)} s/d{' '}
                {ParseDate(order.proyek.tanggal_selesai)}
              </Text>
            </Box>
          )}
          {order.status.status_transaction === TransactionTypes.IN_PROGRESS && (
            <Box mt="2" ml="5">
              <Text fontSize="sm">Tanggal Pengerjaan </Text>
              <Text mr="2" fontSize="sm">
                {ParseDate(order.proyek.tanggal_mulai)} s/d{' '}
                {ParseDate(order.proyek.tanggal_selesai)}
              </Text>
            </Box>
          )}
        </Flex>
        <Flex direction="column" gap={4}>
          <Flex align="center" borderBottomWidth="1px" pb="4" gap={2}>
            <Icon w={3} h={3} as={FaTasks} />
            <Text fontWeight="semibold" fontSize={{ base: 'sm', lg: 'md' }}>
              Detail Pengujian ({order.itemOrders.length} Pengujian)
            </Text>
          </Flex>
          {order.itemOrders.map((item, i) => (
            <Box key={i} p="3" borderWidth={1} boxShadow="base">
              <Flex gap={3}>
                <Box align="stretch" flexGrow={1} direction="column">
                  <Box>
                    <Text fontWeight="semibold">
                      {item.Pengujian.jenis_pengujian}
                    </Text>
                  </Box>
                  <Text fontSize="smaller" color="orange.600">
                    {item.Pengujian.code}
                  </Text>
                  <Flex justify="space-between" align="center">
                    <Badge
                      colorScheme={
                        item.Pengujian.tempat_pengujian === 'Lapangan'
                          ? 'blue'
                          : 'green'
                      }
                      w="max"
                      px="2"
                      py="1"
                      rounded="md"
                      mt="2"
                    >
                      {item.Pengujian.tempat_pengujian}
                    </Badge>
                    <Box>
                      <Text textAlign="end" fontSize="smaller">
                        {item.OrderPengujian.quantity} {item.Pengujian.sampler}
                      </Text>
                    </Box>
                  </Flex>
                  <HStack align="center">
                    <Spacer />
                    <Text fontSize="x-small">Harga : </Text>
                    <Text fontWeight="semibold" color="blue.700">
                      Rp
                      {formatCurrency(
                        parseInt(item.OrderPengujian.quantity) *
                          parseInt(item.Pengujian.price)
                      )}
                    </Text>
                  </HStack>
                </Box>
              </Flex>
            </Box>
          ))}

          <HStack p="2" align="center">
            <Spacer />
            <Text fontSize="sm">Total Pesanan : </Text>
            <Text
              fontWeight="bold"
              color="blue.700"
              fontSize={{ base: 'md', lg: '2xl' }}
            >
              Rp{formatCurrency(order.total_price)}
            </Text>
          </HStack>
          <HStack>
            <Spacer />
            <ButtonGroup>
              {order.status.status_transaction === TransactionTypes.ACCEPT && (
                <Button
                  w="full"
                  isDisabled={
                    order.status.status_payment === BooleanType.TRUE
                      ? true
                      : false
                  }
                  onClick={onOpenPayment}
                  leftIcon={<FaWallet />}
                  variant="lateksil-solid"
                >
                  {order.status.status_payment === BooleanType.TRUE
                    ? 'Sudah Bayar'
                    : 'Bayar'}
                </Button>
              )}
              {order.status.status_transaction ===
                TransactionTypes.IN_PROGRESS && (
                <Button
                  w="full"
                  variant="lateksil-solid"
                  onClick={() =>
                    handleDownloadKwitansi(order.payment.image_kwitansi)
                  }
                >
                  Bukti Kwitansi
                </Button>
              )}
              {order.status.status_transaction === TransactionTypes.DONE && (
                <ButtonGroup>
                  <Button
                    w="full"
                    variant="lateksil-solid"
                    onClick={() =>
                      handleDownloadKwitansi(order.payment.image_kwitansi)
                    }
                  >
                    Bukti Kwitansi
                  </Button>
                  <Button
                    w="full"
                    variant="lateksil-solid"
                    onClick={() =>
                      router.push(
                        `${baseUrl}view-result/download/${order.file_result_pengujian}`
                      )
                    }
                  >
                    Download Hasil
                  </Button>
                </ButtonGroup>
              )}
            </ButtonGroup>
          </HStack>
        </Flex>
      </VStack>
      <ModalPayment
        isOpen={isOpenPayment}
        onClose={onClosePayment}
        id={order.id}
        full_name={order.User.full_name}
        company_name={order.User.company_name}
        total_price={order.total_price}
      />
    </React.Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const detailPengujianUrl = `/order/${id}`;

  const dataOrderPengujian = await fetcherWithContext(
    detailPengujianUrl,
    context
  );

  if (!dataOrderPengujian)
    return {
      redirect: { destination: '/', permanent: false },
    };

  return {
    props: {
      pengujianId: id,
      order: dataOrderPengujian.data,
      fallback: {
        [detailPengujianUrl]: dataOrderPengujian,
      },
    },
  };
};

DetailOrderPengujian.getLayout = (page) => (
  <DashboardLayout sidebarFor="users">{page}</DashboardLayout>
);

export default DetailOrderPengujian;
