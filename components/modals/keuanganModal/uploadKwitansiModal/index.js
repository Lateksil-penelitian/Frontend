import {
  Box,
  Button,
  ButtonGroup,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import useMutationAddKwitansi from '../../../hooks/mutation/useMutationAddKwitansi';

const UploadKwitansiModal = ({ id, isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const fileInputRef = useRef(null);

  const { mutate: mutateAddKwitansi, isLoading: isLoadingAddKwitansi } =
    useMutationAddKwitansi();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setUploadImage(file);
    setSelectedFile(URL.createObjectURL(file));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setUploadImage(file);
    setSelectedFile(URL.createObjectURL(file));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUploadKwitansi = async () => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('image_kwitansi', uploadImage);

    mutateAddKwitansi(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="xl"
      scrollBehavior="inside"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent mx="4" overflow="hidden">
        <ModalHeader />
        <ModalBody>
          <VStack>
            <Box py="2" borderBottomWidth={2} w="full">
              <Text fontWeight="semibold" fontSize="xl">
                Upload Kwitansi
              </Text>
            </Box>
            <Box py="2" w="full">
              <Text>Silahkan Unggah Kwitansi Pemabayaran</Text>
            </Box>
            <Box
              width="full"
              bg="gray.200"
              py={selectedFile ? '0' : '20'}
              border="2px dashed gray"
              borderRadius="md"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {selectedFile ? (
                <Image src={selectedFile} alt="Choose File Images" />
              ) : (
                <>
                  <Text>Tarik dan Lepaskan kesini atau </Text>
                  <Box cursor="pointer" onClick={handleClick}>
                    <Text fontWeight="semibold" textDecoration="underline">
                      Pilih File
                    </Text>
                  </Box>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                ref={fileInputRef}
              />
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter bg="gray.100">
          <ButtonGroup display="flex" flexGrow={1}>
            <Button flexGrow={1} rounded="md" onClick={onClose} border="1px">
              Tutup
            </Button>
            <Button
              isDisabled={selectedFile ? false : true}
              flexGrow={1}
              rounded="md"
              variant="lateksil-solid"
              isLoading={isLoadingAddKwitansi}
              onClick={handleUploadKwitansi}
            >
              Kirim Kwitansi
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadKwitansiModal;
