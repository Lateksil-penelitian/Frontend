import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  Icon,
} from '@chakra-ui/react';
import React from 'react';
import { MdOutlinePayments } from 'react-icons/md';
import useMutationActiveMethodPayment from '../../../hooks/mutation/put/useMutationActiveMethodPayment';
import useToastNotification from '../../../hooks/useToastNotification';

const ActiveMethodModal = ({ isOpen, onClose, id }) => {
  const showToast = useToastNotification();
  const {
    mutateAsync: mutateMethodPayment,
    isLoading: isLoadingMutatePayment,
  } = useMutationActiveMethodPayment({
    id,
  });

  const handleActiveMethodPayment = () => {
    try {
      mutateMethodPayment();
    } catch (error) {
      showToast('Server Sedang Bermasalah', 'error');
    } finally {
      onClose();
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
            <Icon as={MdOutlinePayments} fontSize="6xl" color="green.600" />
            <Text fontSize="sm" textAlign="center">
              Apakah Anda Yakin Akun ini di aktifkan sebagai Metode Pembayaran?
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter bg="gray.100">
          <ButtonGroup display="flex" flexGrow={1}>
            <Button flexGrow={1} rounded="md" onClick={onClose} border="1px">
              Batal
            </Button>
            <Button
              flexGrow={1}
              rounded="md"
              isLoading={isLoadingMutatePayment}
              onClick={handleActiveMethodPayment}
              colorScheme="green"
            >
              Yakin
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ActiveMethodModal;
