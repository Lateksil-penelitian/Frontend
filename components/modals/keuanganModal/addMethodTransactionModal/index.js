import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useToastNotification from '../../../hooks/useToastNotification';
import useMutationCreateMethodTransaction from '../../../hooks/mutation/useMutationCreateMethodTransaction';
import { yupResolver } from '@hookform/resolvers/yup';
import { MethodTransactionSchema } from '../../../../utils/schema/MethodTransactionSchema';

const AddMethodTransactionModal = ({ isOpen, onClose }) => {
  const showToast = useToastNotification();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(MethodTransactionSchema),
  });

  const {
    mutateAsync: mutateAsyncCreateMethodTransaction,
    isLoading: isLoadingCreateMethodTransaction,
  } = useMutationCreateMethodTransaction();

  const onModalClose = () => {
    onClose();
    reset();
  };

  const onSubmit = (data) => {
    const formData = {
      type_transaction: data.type_transaction,
      bank: data.bank,
      name_bank: data.name_bank,
      no_rek: data.no_rek,
    };

    try {
      mutateAsyncCreateMethodTransaction(formData);
    } catch (error) {
      showToast('Server Sedang Bermasalah', 'error');
    } finally {
      onModalClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent mx="4" overflow="hidden">
        <Box as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <ModalHeader>
            <Text>Tambah Pembayaran</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <FormControl
                id="type_transaction"
                isInvalid={!!errors.type_transaction}
                isRequired
              >
                <FormLabel>Type Transaction</FormLabel>
                <Input
                  type="text"
                  placeholder="Example : Transfer "
                  {...register('type_transaction')}
                />
                <FormErrorMessage>
                  {errors.type_transaction && errors.type_transaction.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="bank" isInvalid={!!errors.bank} isRequired>
                <FormLabel>Bank</FormLabel>
                <Input
                  type="text"
                  placeholder="BSI, BCA, Mandiri, dll "
                  {...register('bank')}
                />
                <FormErrorMessage>
                  {errors.bank && errors.bank.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                id="name_bank"
                isInvalid={!!errors.name_bank}
                isRequired
              >
                <FormLabel>Nama Pemilik Account Bank</FormLabel>
                <Input
                  type="text"
                  placeholder="Example : Name Account Bank"
                  {...register('name_bank')}
                />
                <FormErrorMessage>
                  {errors.name_bank && errors.name_bank.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="no_rek" isInvalid={!!errors.no_rek} isRequired>
                <FormLabel>No Rekening</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukan No Rekening"
                  {...register('no_rek')}
                />
              </FormControl>
              <FormErrorMessage>
                {errors.no_rek && errors.no_rek.message}
              </FormErrorMessage>
            </Stack>
          </ModalBody>

          <ModalFooter bg="gray.100">
            <ButtonGroup>
              <Button onClick={onModalClose} border="1px">
                Batal
              </Button>
              <Button
                type="submit"
                isLoading={isLoadingCreateMethodTransaction}
                variant="solid"
                bg="blue.700"
                color="white"
                rounded="md"
              >
                Tambah
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default AddMethodTransactionModal;
