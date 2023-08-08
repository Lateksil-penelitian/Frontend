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
import { TbNotes, TbNotesOff } from 'react-icons/tb';
import { TransactionTypes } from '../../../../utils/enum/TransactionTypes';
import useMutationSendCostumer from '../../../hooks/mutation/put/useMutationSendCostumer';

const SendCostumerModal = ({ isAccepted, id, isOpen, onClose }) => {
  const { mutate: mutauteSendCostumer, isLoading } = useMutationSendCostumer();

  const SendAcceptedCostumer = () => {
    const formData = {
      id,
      status_transaction: TransactionTypes.ACCEPT,
    };
    mutauteSendCostumer({ formData: formData });
    onClose();
  };

  const SendCanceledCostumer = () => {
    const formData = {
      id,
      status_transaction: TransactionTypes.CANCELED,
    };
    mutauteSendCostumer({ formData: formData });
    onClose();
  };
  if (isAccepted)
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx="4" overflow="hidden">
          <ModalCloseButton />
          <ModalHeader />
          <ModalBody>
            <VStack>
              <Icon as={TbNotes} fontSize="6xl" color="green.600" />
              <Text fontSize="md" fontWeight="semibold" color="green.600">
                Send Accept To Costumer
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
                flexGrow={1}
                rounded="md"
                colorScheme="green"
                isLoading={isLoading}
                onClick={SendAcceptedCostumer}
              >
                Kirim
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent mx="4" overflow="hidden">
        <ModalCloseButton />
        <ModalHeader />
        <ModalBody>
          <VStack>
            <Icon as={TbNotesOff} fontSize="6xl" color="red.600" />
            <Text fontSize="md" fontWeight="semibold" color="red.600">
              Send Cancel To Costumer
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
              flexGrow={1}
              rounded="md"
              colorScheme="red"
              isLoading={isLoading}
              onClick={SendCanceledCostumer}
            >
              Kirim
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SendCostumerModal;
