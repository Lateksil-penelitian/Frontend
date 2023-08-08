import React from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Icon,
  Text,
  ModalFooter,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import { TbNotes } from 'react-icons/tb';
import useMutationTahapPengerjaanToDone from '../../../hooks/mutation/put/useMutationTahapPengerjaanToDone';
import useToastNotification from '../../../hooks/useToastNotification';
import { useRouter } from 'next/router';

const SendResultToCostumerModal = ({ id, isOpen, onClose }) => {
  const router = useRouter();
  const showToast = useToastNotification();

  const { mutateAsync: mutateSendToDone, isLoading: isLoadingSendToDone } =
    useMutationTahapPengerjaanToDone();

  const SendDoneToCostumers = () => {
    const formData = {
      order_id: id,
    };
    try {
      mutateSendToDone({ formData: formData })
        .then(() =>
          router.push('/frontliner/selesai-pemesanan').then(() => onClose())
        )
        .catch(() => showToast('Server Sedang Bermasalah', 'error'));
    } catch (isError) {
      showToast('Server Sedang Bermasalah', 'error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent mx="4" overflow="hidden">
        <ModalCloseButton />
        <ModalHeader />
        <ModalBody>
          <VStack>
            <Icon as={TbNotes} fontSize="6xl" color="green.600" />
            <Text fontSize="xl" fontWeight="semibold" color="green.600">
              Send Result Order To Costumer
            </Text>
            <Text fontSize="sm" textAlign="center">
              Apakah Ada Yakin Kirim Ke Costumer?
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter bg="gray.100">
          <ButtonGroup display="flex" flexGrow={1}>
            <Button flexGrow={1} rounded="md" onClick={onClose} border="1px">
              Batal
            </Button>
            <Button
              isLoading={isLoadingSendToDone}
              flexGrow={1}
              rounded="md"
              colorScheme="green"
              onClick={SendDoneToCostumers}
            >
              Kirim
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SendResultToCostumerModal;
