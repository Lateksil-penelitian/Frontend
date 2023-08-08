import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
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
  Icon,
  Skeleton,
  HStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { GrFormClose } from 'react-icons/gr';
import useMutationCreateCategories from '../../../hooks/mutation/useMutationCreateCategories';
import useRemoteCategories from '../../../hooks/remote/useRemoteCategories';
import useMutationDeleteCategories from '../../../hooks/mutation/delete/useMutationDeleteCategories';

const AddCategoryModal = ({ isOpen, onClose }) => {
  const { data: dataCategories, isLoading: isLoadingDataCategories } =
    useRemoteCategories();
  const {
    mutate: mutateCreateCategories,
    isLoading: isLoadingCreateCategories,
  } = useMutationCreateCategories();
  const { mutate: mutateDeleteCategories } = useMutationDeleteCategories();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    mutateCreateCategories(data);
  };

  const handleDeleteCategory = (id) => {
    mutateDeleteCategories(id);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent mx="4" overflow="hidden">
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <Text>Tambah Kategori</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Flex flexWrap="wrap">
                {dataCategories?.data?.map((category) => (
                  <Flex
                    key={category.id}
                    border="1px solid black"
                    w="max"
                    pl={2}
                    mb={2}
                    rounded="md"
                    mr={2}
                  >
                    <Box mr="2">
                      <Text>{category.name_category}</Text>
                    </Box>
                    <Flex
                      alignItems="center"
                      mr={1}
                      cursor="pointer"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Icon as={GrFormClose} boxSize={5} />
                    </Flex>
                  </Flex>
                ))}
                {isLoadingDataCategories && (
                  <HStack>
                    <Skeleton width={100} height={8} />
                    <Skeleton width={100} height={8} />
                    <Skeleton width={100} height={8} />
                  </HStack>
                )}
              </Flex>
              <FormControl id="name_category">
                <FormLabel>Nama Kategori Pengujian</FormLabel>
                <Input
                  type="text"
                  placeholder="Tambah Kategori Pengujian"
                  {...register('name_category')}
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter bg="gray.100">
            <ButtonGroup>
              <Button onClick={onClose} border="1px">
                Batal
              </Button>
              <Button
                type="submit"
                isLoading={isLoadingCreateCategories}
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

export default AddCategoryModal;
