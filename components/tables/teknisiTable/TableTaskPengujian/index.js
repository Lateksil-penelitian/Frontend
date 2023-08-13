import React from 'react';
import { useRouter } from 'next/router';
import {
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import ParseDate from '../../../core/parseDate';
import useMutationProgressTaskPengujian from '../../../hooks/mutation/useMutationProgressTaskPengujian';
import useToastNotification from '../../../hooks/useToastNotification';
import { PengerjaanTypes } from '../../../../utils/enum/PengerjaanTypes';
import { TaskTeknisiTypes } from '../../../../utils/enum/TaskTeknisiType';
import useRemoteStatusPeralatan from '../../../hooks/remote/useRemoteStatusPeralatan';
import StatusPeralatan from '../../../core/status/StatusPeralatan';
import { PengambilaAlatType } from '../../../../utils/enum/PembambilanAlatType';
import DetailTeknisiPengerjaan from '../../../modals/teknisiModal/detailTeknisiPengerjaan';
const TableTaskPengujian = ({ pengujian }) => {
  const router = useRouter();
  const showToast = useToastNotification();
  const {
    mutateAsync: mutateTaskToInProgress,
    isLoading: isLoadingTaskProgress,
  } = useMutationProgressTaskPengujian();

  const {
    isOpen: isOpenDetailPengujian,
    onOpen: onOpenDetailPengujian,
    onClose: onCloseDetailPengujian,
  } = useDisclosure();

  const onClickTaskToInProgress = async () => {
    try {
      mutateTaskToInProgress({
        id: pengujian.id,
        status_task: TaskTeknisiTypes.TASK_IN_PROGRESS,
        status_pengerjaan: PengerjaanTypes.IN_PROGRESS,
      }).then(() => router.push('/teknisi/pengerjaan'));
    } catch (error) {
      showToast('Gagal memperbarui data', 'error');
    }
  };

  const { data: dataStatusPeralatan, isLoading: isLoadingStatusPeralatan } =
    useRemoteStatusPeralatan({
      id: pengujian.orderId,
    });

  const { color: color_peralatan, text: text_peralatan } = StatusPeralatan({
    status: dataStatusPeralatan?.data.status_peralatan,
  });
  return (
    <>
      <Tr>
        <Td cursor="pointer" onClick={onOpenDetailPengujian}>
          <Flex direction="column" w="full">
            <Text fontWeight="semibold">{pengujian.order.User.full_name}</Text>
            <Text>{pengujian.order.User.company_name}</Text>
          </Flex>
        </Td>
        <Td textAlign="center" cursor="pointer" onClick={onOpenDetailPengujian}>
          {pengujian.order.proyek.nama_proyek}
        </Td>
        <Td textAlign="center" cursor="pointer" onClick={onOpenDetailPengujian}>
          {ParseDate(pengujian.order.proyek.tanggal_mulai)}
        </Td>
        <Td textAlign="center" cursor="pointer" onClick={onOpenDetailPengujian}>
          {ParseDate(pengujian.order.proyek.tanggal_selesai)}
        </Td>
        <Td textAlign="center" cursor="pointer" onClick={onOpenDetailPengujian}>
          <Badge ml="3" p="2" colorScheme={color_peralatan} rounded="md">
            {text_peralatan}
          </Badge>
        </Td>
        <Td textAlign="center" cursor="pointer">
          <Badge colorScheme="orange" p="2" rounded="md" w="full">
            Belum Dikerjakan
          </Badge>
        </Td>
        <Td textAlign="center" cursor="pointer">
          <Button
            isDisabled={
              dataStatusPeralatan?.data.status_peralatan ===
              PengambilaAlatType.COMPLETED
                ? false
                : true
            }
            variant="lateksil-solid"
            isLoading={isLoadingTaskProgress || isLoadingStatusPeralatan}
            onClick={onClickTaskToInProgress}
          >
            Kerjakan
          </Button>
        </Td>
      </Tr>
      <DetailTeknisiPengerjaan
        id={pengujian.order.id}
        isOpen={isOpenDetailPengujian}
        onClose={onCloseDetailPengujian}
      />
    </>
  );
};

export default TableTaskPengujian;
