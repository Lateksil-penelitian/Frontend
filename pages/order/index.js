import React, { useEffect, useState } from 'react';
import {
  Center,
  HStack,
  Spinner,
  TableContainer,
  Text,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ButtonTab from '../../components/core/ButtonTab';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import TableCardHistoryTransaction from '../../components/tables/userTable/TableCardHistoryTransaction';

import { TransactionTypes } from '../../utils/enum/TransactionTypes';
import useRemoteOrder from '../../components/hooks/remote/useRemoteOrder';
import MessageDataNotFoundClient from '../../utils/MessageDataNotFoundClient';
import MessageClientNotFoundData from '../../utils/MessageClientNotFoundData';
import useAuthUserStore from '../../store/useAuthUserStore';
const HistroyTransactions = () => {
  const router = useRouter();
  const id = useAuthUserStore((state) => state.id);
  const [type, setType] = useState(TransactionTypes.WAITING);

  useEffect(() => {
    const { query } = router;
    if (query.type) {
      const validTypes = ['1', '2', '3', '4', '0']; // Tipe yang valid
      if (validTypes.includes(query.type)) {
        setType(query.type);
      } else {
        router.push('/order?type=1');
      }
    }
  }, [router]);

  const handleChangeType = (newType) => {
    const queryParams = { ...router.query, type: newType };
    router.push({
      pathname: router.pathname,
      query: queryParams,
    });
  };

  const { data: dataOrdering, isLoading: isLoadingOrdering } = useRemoteOrder({
    status_transaction: type,
  });

  return (
    <VStack align="stretch" spacing={5}>
      <Head>
        <title>Daftar Transaksi | Lateksil</title>
      </Head>
      <HStack borderBottomWidth="1px" pb="4">
        <Text color="blue.700" fontWeight="bold" fontSize="xl">
          Riwayat Transaksi
        </Text>
      </HStack>
      <TableContainer>
        <HStack align="center" spacing={5}>
          <ButtonTab
            label={TransactionTypes.WAITING}
            value={type}
            onClick={() => handleChangeType(TransactionTypes.WAITING)}
          >
            Tahap Permintaan
          </ButtonTab>
          <ButtonTab
            label={TransactionTypes.ACCEPT}
            value={type}
            onClick={() => handleChangeType(TransactionTypes.ACCEPT)}
          >
            Tahap Pembayaran
          </ButtonTab>
          <ButtonTab
            label={TransactionTypes.IN_PROGRESS}
            value={type}
            onClick={() => handleChangeType(TransactionTypes.IN_PROGRESS)}
          >
            Tahap Pengerjaan
          </ButtonTab>
          <ButtonTab
            label={TransactionTypes.DONE}
            value={type}
            onClick={() => handleChangeType(TransactionTypes.DONE)}
          >
            Selesai
          </ButtonTab>
          <ButtonTab
            label={TransactionTypes.CANCELED}
            value={type}
            onClick={() => handleChangeType(TransactionTypes.CANCELED)}
          >
            Dibatalkan
          </ButtonTab>
        </HStack>
      </TableContainer>
      <VStack borderBottomWidth="1px" pb="4">
        {dataOrdering &&
          dataOrdering.data?.map((order, i) => (
            <TableCardHistoryTransaction key={i} order={order} />
          ))}

        {isLoadingOrdering && (
          <Center my="10">
            <Spinner />
          </Center>
        )}
        {dataOrdering?.totalData === 0 && (
          <MessageDataNotFoundClient>
            Ups? Dalam Tahap ini Data Kosong
          </MessageDataNotFoundClient>
        )}
        {!id && !isLoadingOrdering && (
          <MessageClientNotFoundData isLogin={false} />
        )}
      </VStack>
    </VStack>
  );
};

HistroyTransactions.getLayout = (page) => (
  <DashboardLayout sidebarFor="users">{page}</DashboardLayout>
);

export default HistroyTransactions;
