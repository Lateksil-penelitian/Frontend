import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import useRemoteBuktiPembayaranById from '../../../hooks/remote/useRemoteBuktiPembayarById';
import LoadingData from '../../../../utils/LoadingData';
import download from 'downloadjs';
import useToastNotification from '../../../hooks/useToastNotification';
import { baseUrl } from '../../../../libs/axios';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id');

const BuktiPembayaranModal = ({ id, isOpen, onClose }) => {
  const showToast = useToastNotification();
  const {
    data: dataBuktiPembayaran,
    isSuccess,
    isLoading: isLoadingBuktiPembayaran,
  } = useRemoteBuktiPembayaranById({
    id: id,
  });

  const getFileExtension = (url) => {
    const extension = url.substring(url.lastIndexOf('.') + 1);
    return extension.toLowerCase();
  };

  const handleDownloadClick = (data) => {
    const ImageURL = `${baseUrl}bukti-pembayaran/` + data.image_payment;

    fetch(ImageURL)
      .then((response) => response.blob())
      .then((blob) => {
        const fileExtension = getFileExtension(ImageURL);
        const fileName = `${data.full_name}_${data.company_name}.${fileExtension}`;
        download(blob, fileName);
      })
      .catch(() => {
        showToast('Silahkan Download Lagi nanti', 'error');
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="xl"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent mx="4" overflow="hidden">
        <ModalHeader />
        <ModalBody>
          <VStack>
            <Box py="2" borderBottomWidth={2} w="full">
              <Text fontWeight="semibold" fontSize="xl">
                Riwayat Pembayaran
              </Text>
            </Box>
            {isLoadingBuktiPembayaran && <LoadingData />}
            {isSuccess && (
              <>
                <VStack spacing={3}>
                  <Box py="2" w="full">
                    <Text>
                      Dibawah ini adalah bukti pembayaran atas nama{' '}
                      {dataBuktiPembayaran?.data.full_name} Perusahaan{' '}
                      {dataBuktiPembayaran?.data.company_name}{' '}
                    </Text>
                    <Text fontWeight="semibold">
                      Tanggal Pembayaran :{' '}
                      {dayjs(dataBuktiPembayaran?.data.createdAt).format(
                        'dddd, DD MMMM YYYY'
                      )}
                    </Text>
                  </Box>
                  <Image
                    rounded="md"
                    src={
                      isSuccess
                        ? `${baseUrl}bukti-pembayaran/${dataBuktiPembayaran?.data.image_payment}`
                        : null
                    }
                    alt="bukti-pembayaran"
                  />
                </VStack>
              </>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter bg="gray.100">
          <ButtonGroup display="flex" flexGrow={1}>
            <Button flexGrow={1} rounded="md" onClick={onClose} border="1px">
              Tutup
            </Button>
            <Button
              flexGrow={1}
              rounded="md"
              variant="lateksil-solid"
              onClick={() => handleDownloadClick(dataBuktiPembayaran?.data)}
            >
              Download Bukti Pembayaran
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BuktiPembayaranModal;
