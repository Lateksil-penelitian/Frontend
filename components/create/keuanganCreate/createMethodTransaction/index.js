import React from 'react';
import {
  Button,
  HStack,
  Spacer,
  Text,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';
import { IoAdd } from 'react-icons/io5';
import AddMethodTransactionModal from '../../../modals/keuanganModal/addMethodTransactionModal';

const CreateNewMethodTransaction = () => {
  const {
    isOpen: isOpenAddMethodTransaction,
    onOpen: onOpenAddMethodTransaction,
    onClose: onCloseAddMethodTransaction,
  } = useDisclosure();
  return (
    <React.Fragment>
      <HStack borderBottomWidth="1px" pb="6">
        <Text color="blue.700" fontWeight="bold" fontSize="xl">
          Metode Pembayaran
        </Text>
        <Spacer />
        <Button
          onClick={onOpenAddMethodTransaction}
          rounded="md"
          variant="outline"
          color="blue.700"
          border="1px"
          borderColor="blue.700"
          leftIcon={<Icon as={IoAdd} fontSize="xl" />}
        >
          Akun Bank
        </Button>
      </HStack>
      <AddMethodTransactionModal
        isOpen={isOpenAddMethodTransaction}
        onClose={onCloseAddMethodTransaction}
      />
    </React.Fragment>
  );
};
export default CreateNewMethodTransaction;
