import React, { useEffect, useState } from 'react';
import {
  AspectRatio,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  Icon,
  ModalFooter,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
} from '@chakra-ui/react';
import { HiShoppingCart } from 'react-icons/hi2';
import useRemoteUserProfile from '../../hooks/remote/useRemoteUserProfile';
import { useRouter } from 'next/router';
import formatCurrency from '../../../utils/formatCurrently';
import useMutationAddToCart from '../../hooks/mutation/useMutationAddToCart';
import useAuthUserStore from '../../../store/useAuthUserStore';
import { baseUrl } from '../../../libs/axios';

const ModalDetailPengujian = ({ pengujian, isOpen, onClose }) => {
  const router = useRouter();
  const { data } = useRemoteUserProfile();
  const { mutate: mutateAddToCart, isLoading: isLoadingAddCart } =
    useMutationAddToCart();

  const minKuantitas = parseInt(pengujian.min_quantity);
  const [value, setValue] = useState(minKuantitas);
  const [isDescrement, setIsDescrement] = useState(false);

  const totalPrice = parseInt(pengujian.price) * value;

  function handleIncrement() {
    setValue((prevState) => prevState + 1);
    if (value < 1) {
      setValue(1);
    }
  }

  const userId = useAuthUserStore((state) => state.id);

  useEffect(() => {
    if (minKuantitas === value) {
      setIsDescrement(true);
    } else {
      setIsDescrement(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function handleDecrement() {
    setValue((prevState) => prevState - 1);
  }

  const onMoveToCart = async () => {
    if (data) {
      mutateAddToCart({
        user_id: userId,
        pengujian_id: pengujian.id,
        quantity: value,
      });
      router.push('/cart');
    } else {
      router.push('/login');
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: 'full', md: 'xl' }}
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay />
      <ModalContent overflow="hidden">
        <ModalHeader>Detail Pengujian</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={5}>
            <Flex w="full">
              <Text fontWeight="bold" fontSize="xl">
                {pengujian.jenis_pengujian}
              </Text>
            </Flex>
            <Flex w="full" direction={{ base: 'column', md: 'row' }}>
              <Box flex={0.8}>
                <AspectRatio w="full" ratio={1}>
                  <Image
                    src={
                      pengujian.image
                        ? `${baseUrl}uploads/${pengujian.image}`
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzaf-A9g3WCySkL8QBaTArVm5ELMy8NkXmb3tAmG0&s'
                    }
                    alt="Image"
                    objectFit="cover"
                    rounded="md"
                  />
                </AspectRatio>
              </Box>
              <VStack
                flex={1.2}
                ml={{ base: 0, md: 3 }}
                py={{ base: 2, md: 0 }}
              >
                <Text w="full" fontSize="md" fontWeight="semibold">
                  Deskripsi
                </Text>
                <Text w="full">{pengujian.description}</Text>
              </VStack>
            </Flex>
            <Flex w="full" direction="column">
              <Text fontWeight="semibold">Catatan Khusus</Text>
              <Text whiteSpace="pre-line">{pengujian.catatan_khusus}</Text>
            </Flex>
            <Flex w="full" align="center">
              <InputGroup width="150px">
                <InputLeftElement>
                  <Button
                    size="sm"
                    isDisabled={isDescrement}
                    onClick={handleDecrement}
                  >
                    -
                  </Button>
                </InputLeftElement>
                <Input
                  type="number"
                  textAlign="center"
                  max={999}
                  min={1}
                  value={value}
                  onChange={(e) => {
                    let newValue = parseInt(e.target.value);
                    if (newValue < minKuantitas) {
                      newValue = minKuantitas;
                    } else if (newValue > 999) {
                      newValue = 999;
                    }
                    setValue(newValue);
                  }}
                />
                <InputRightElement>
                  <Button size="sm" onClick={handleIncrement}>
                    +
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Text ml="2">{pengujian.sampler}</Text>
            </Flex>
            <Flex w="full" justify="start" px="2">
              <Text mr="3" fontWeight="medium">
                Harga Per {pengujian.sampler} :
              </Text>
              <Text color="blue.700" fontWeight="medium" fontSize="md">
                Rp{formatCurrency(pengujian.price)}
              </Text>
            </Flex>
            <Flex w="full" justify="end">
              <Text mr="3" fontWeight="semibold" fontSize="2xl">
                Total
              </Text>
              <Text fontWeight="bold" fontSize="2xl" color="blue.700">
                Rp{formatCurrency(totalPrice)}
              </Text>
            </Flex>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup w="full" justifyContent="end">
            <Button
              onClick={onClose}
              rounded="md"
              variant="outline"
              border="1px"
            >
              Batal
            </Button>
            <Button
              variant="lateksil-solid"
              onClick={onMoveToCart}
              isLoading={isLoadingAddCart}
              leftIcon={<Icon as={HiShoppingCart} fontSize="xl" />}
            >
              Tambah Keranjang
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDetailPengujian;
