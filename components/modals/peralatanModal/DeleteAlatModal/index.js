import React from 'react';
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
import { FaTools } from 'react-icons/fa';
import useMutationDeletePeralatan from '../../../hooks/mutation/delete/useMutationDeletePeralatan';
import useToastNotification from '../../../hooks/useToastNotification';

const DeleteAlatModel = ({ id, isOpen, onClose }) => {
  const showToast = useToastNotification();
  const {
    mutateAsync: mutateDeletePeralatan,
    isLoading: isLoadingDeletePeralatan,
  } = useMutationDeletePeralatan();

  const handleDeletePeralatan = async () => {
    try {
      mutateDeletePeralatan(id);
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
            <Icon as={FaTools} fontSize="6xl" color="red.600" />
            <Text fontSize="md" fontWeight="semibold" color="red.600">
              Hapus Alat
            </Text>
            <Text fontSize="sm" textAlign="center">
              Apakah Ada Yakin Hapus Alat ini?
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
              isLoading={isLoadingDeletePeralatan}
              rounded="md"
              colorScheme="red"
              onClick={handleDeletePeralatan}
            >
              Hapus
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteAlatModel;
