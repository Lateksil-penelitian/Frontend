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
import AddPeralatanPengujianModal from '../../modals/peralatanModal/AddPeralatanModal';

const PeralatanCreate = () => {
  const {
    isOpen: isOpenAddPeralatan,
    onOpen: onOpenAddPeralatan,
    onClose: onCloseAddPeralatan,
  } = useDisclosure();
  return (
    <React.Fragment>
      <HStack borderBottomWidth="1px" pb="6">
        <Text color="blue.700" fontWeight="bold" fontSize="xl">
          Input Peralatan
        </Text>
        <Spacer />
        <Button
          onClick={onOpenAddPeralatan}
          rounded="md"
          variant="outline"
          color="blue.700"
          border="1px"
          borderColor="blue.700"
          leftIcon={<Icon as={IoAdd} fontSize="xl" />}
        >
          Tambah Peralatan
        </Button>
      </HStack>
      <AddPeralatanPengujianModal
        isOpen={isOpenAddPeralatan}
        onClose={onCloseAddPeralatan}
      />
    </React.Fragment>
  );
};

export default PeralatanCreate;
