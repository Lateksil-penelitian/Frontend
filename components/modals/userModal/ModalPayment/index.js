import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  SkeletonText,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import formatCurrency from '../../../../utils/formatCurrently';
import useMutationBuktiPembayaran from '../../../hooks/mutation/useMutationBuktiPembayaran';
import useRemoteMethodTransaction from '../../../hooks/remote/useRemoteMethodTransaction';

const ModalPayment = ({
  isOpen,
  onClose,
  id,
  full_name,
  company_name,
  total_price,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [showButton, setShowButton] = useState(false);

  const { data: dataMethodTransaction, isLoading: isLoadingMethodTransaction } =
    useRemoteMethodTransaction();

  const {
    mutateAsync: mutateUploadBuktiPembayaran,
    isLoading: isLoadingUploadBuktiPembayaran,
  } = useMutationBuktiPembayaran();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setUploadImage(file);
    setSelectedImage(URL.createObjectURL(file));
    setShowButton(true);
  };

  const handleUploadBuktiPembayaran = async () => {
    const formData = new FormData();
    formData.append('id_order', id);
    formData.append('full_name', full_name);
    formData.append('company_name', company_name);
    formData.append('total_price', total_price);
    formData.append('image_payment', uploadImage);

    mutateUploadBuktiPembayaran(formData).then(() => onClose());
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent mx="3" rounded="xl" overflow="auto">
        <Box flex="1" flexGrow="1">
          <Flex direction="column">
            <VStack bg="#002855" color="white" px="5" pt="5">
              <HStack justify="space-between" w="full" h="full">
                <Text fontWeight="semibold">Proses Pembayaran</Text>
                <Box
                  onClick={onClose}
                  p="1"
                  cursor="pointer"
                  textDecoration="underline"
                >
                  Kembali
                </Box>
              </HStack>
              <Box position="relative" w="full" h="70px">
                <Box
                  bg="white"
                  position="absolute"
                  shadow="base"
                  rounded="md"
                  bottom="-10"
                  w="full"
                  p="5"
                >
                  <Text color="black" fontWeight="semibold">
                    Total
                  </Text>
                  <Text color="#002855" fontWeight="bold" fontSize="2xl">
                    Rp{formatCurrency(total_price)}
                  </Text>
                </Box>
              </Box>
            </VStack>
            <Flex
              mt="20"
              direction="column"
              borderBottomWidth={1}
              pb="2"
              mx="5"
            >
              {isLoadingMethodTransaction ? (
                <>
                  <SkeletonText
                    mt="2"
                    noOfLines={1}
                    spacing="4"
                    skeletonHeight="5"
                  />
                  <SkeletonText
                    mt="2"
                    noOfLines={1}
                    spacing="4"
                    skeletonHeight="5"
                  />
                </>
              ) : (
                <>
                  <Text color="black" fontWeight="semibold">
                    Metode Pembayaran
                  </Text>
                  <Text color="black">
                    {dataMethodTransaction?.data?.type_transaction}
                  </Text>
                </>
              )}
            </Flex>
            <Flex direction="column" borderBottomWidth={1} pb="2" m="5">
              {isLoadingMethodTransaction ? (
                <>
                  <SkeletonText
                    mt="2"
                    noOfLines={1}
                    spacing="4"
                    skeletonHeight="5"
                  />
                  <SkeletonText
                    mt="2"
                    noOfLines={1}
                    spacing="4"
                    skeletonHeight="5"
                  />
                </>
              ) : (
                <>
                  <Text color="black" fontWeight="semibold">
                    Bank Tujuan : {dataMethodTransaction?.data?.bank}
                  </Text>
                  <Text color="black" fontWeight="semibold">
                    Atas Nama : {dataMethodTransaction?.data?.name_bank}
                  </Text>
                </>
              )}
            </Flex>
            <Flex direction="column" borderBottomWidth={1} pb="2" m="5">
              {isLoadingMethodTransaction ? (
                <>
                  <SkeletonText
                    mt="2"
                    noOfLines={1}
                    spacing="4"
                    skeletonHeight="5"
                  />
                  <SkeletonText
                    mt="2"
                    noOfLines={1}
                    spacing="4"
                    skeletonHeight="9"
                  />
                </>
              ) : (
                <>
                  <Text color="black">No Rekening</Text>
                  <Text color="#002855" fontWeight="semibold" fontSize="2xl">
                    {dataMethodTransaction?.data?.no_rek}
                  </Text>
                </>
              )}
            </Flex>
            <Flex direction="column" pb="2" m="5">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  rounded="md"
                  alt="Upload Images To Payment"
                  maxH="500px"
                />
              )}
              <FormControl mt={2}>
                <FormLabel htmlFor="image-upload">Pilih Gambar</FormLabel>
                <Input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload">
                  <Button as="span" w="full">
                    Upload Bukti Pembayaran
                  </Button>
                </label>
              </FormControl>
              {showButton && (
                <Button
                  onClick={handleUploadBuktiPembayaran}
                  isLoading={isLoadingUploadBuktiPembayaran}
                  w="full"
                  variant="lateksil-solid"
                  mt="5"
                >
                  Kirim Bukti Pembayaran
                </Button>
              )}
            </Flex>
          </Flex>
        </Box>
      </ModalContent>
    </Modal>
  );
};
export default ModalPayment;
