import {
  Button,
  ButtonGroup,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  Text,
} from '@chakra-ui/react';
import { IoWarningOutline } from 'react-icons/io5';

const ModalWarning = ({
  isOpen,
  onClose,
  buttonText,
  buttonOnClick,
  isLoading = false,
  children,
}) => {
  return (
    <Modal
      size="sm"
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={!isLoading}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <VStack>
            <Icon as={IoWarningOutline} fontSize="9xl" color="red" />
            <Text>Warning</Text>
          </VStack>
        </ModalHeader>
        <ModalBody>
          <Text fontSize="sm" textAlign="center">
            {children}
          </Text>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup d="flex" flexGrow={1}>
            <Button
              flexGrow={1}
              variant="outline"
              rounded="md"
              onClick={onClose}
              isDisabled={isLoading}
            >
              Batal
            </Button>
            <Button
              flexGrow={1}
              color="white"
              bg="red.500"
              rounded="md"
              onClick={buttonOnClick}
              isLoading={isLoading}
            >
              {buttonText}
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalWarning;
