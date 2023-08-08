import React from 'react';
import {
  Button,
  HStack,
  Spacer,
  Text,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import { IoAdd } from 'react-icons/io5';
import AddPengujianModal from '../../../modals/frontlinerModal/addPengujianModal';
import AddCategoryModal from '../../../modals/frontlinerModal/addCategoryModal';

const CreateNewInputPengujian = () => {
  const {
    isOpen: isOpenAddPengujian,
    onOpen: onOpenAddPengujian,
    onClose: onCloseAddPengujian,
  } = useDisclosure();

  const {
    isOpen: isOpenAddCategory,
    onOpen: onOpenAddCategory,
    onClose: onCloseAddCategory,
  } = useDisclosure();
  return (
    <React.Fragment>
      <HStack borderBottomWidth="1px" pb="6">
        <Text color="blue.700" fontWeight="bold" fontSize="xl">
          Input Pengujian
        </Text>
        <Spacer />
        <Button
          onClick={onOpenAddCategory}
          rounded="md"
          variant="outline"
          color="blue.700"
          border="1px"
          borderColor="blue.700"
          leftIcon={<Icon as={IoAdd} fontSize="xl" />}
        >
          Tambah Kategori
        </Button>
        <Button
          onClick={onOpenAddPengujian}
          rounded="md"
          variant="outline"
          color="blue.700"
          border="1px"
          borderColor="blue.700"
          leftIcon={<Icon as={IoAdd} fontSize="xl" />}
        >
          Tambah Pengujian
        </Button>
      </HStack>
      <AddCategoryModal
        isOpen={isOpenAddCategory}
        onClose={onCloseAddCategory}
      />
      <AddPengujianModal
        isOpen={isOpenAddPengujian}
        onClose={onCloseAddPengujian}
      />
    </React.Fragment>
  );
};

export default CreateNewInputPengujian;
