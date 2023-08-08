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
import useToastNotification from '../../../hooks/useToastNotification';
import useMutationProgressTaskPengujian from '../../../hooks/mutation/useMutationProgressTaskPengujian';
import { PengerjaanTypes } from '../../../../utils/enum/PengerjaanTypes';

const SendReportPengujianModal = ({ id, isOpen, onClose }) => {
  const showToast = useToastNotification();

  const { mutateAsync: mutateTaskToComplete, isLoading: isLoadingComplete } =
    useMutationProgressTaskPengujian();

  const onClickTaskToCompleted = async () => {
    try {
      mutateTaskToComplete({
        id: id,
        status_pengerjaan: PengerjaanTypes.COMPLETED,
      }).then(() => onClose());
    } catch (error) {
      showToast('Gagal memperbarui data', 'error');
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
            <Icon as={TbNotes} fontSize="6xl" color="blue.600" />
            <Text fontSize="md" fontWeight="bold" color="blue.600">
              Send Report To Manager
            </Text>
            <Text fontSize="sm" textAlign="center">
              Apakah Ada Yakin Kirim Ke Manager?
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
              variant="lateksil-solid"
              isLoading={isLoadingComplete}
              onClick={onClickTaskToCompleted}
            >
              Kirim
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SendReportPengujianModal;
