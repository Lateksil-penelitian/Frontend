import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import useMutationPengajuanAlat from '../../../hooks/mutation/put/useMutationPengajuanAlat';
import { PengambilaAlatType } from '../../../../utils/enum/PembambilanAlatType';

const PengajuanAlatModal = ({ id, isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [disabledButton, setDisabledButton] = useState(true);
  const fileInputRef = useRef(null);

  const {
    mutateAsync: mutatePengajuanAlat,
    isLoading: isLoadingPengajuanAlat,
  } = useMutationPengajuanAlat({
    id,
  });

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setUploadImage(file);
    setSelectedFile(URL.createObjectURL(file));
    setDisabledButton(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setUploadImage(file);
    setSelectedFile(URL.createObjectURL(file));
    setDisabledButton(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onModalClose = () => {
    onClose();
    setSelectedFile(null);
    setUploadImage(null);
  };

  const hadlePengajuanAlat = async () => {
    const formData = new FormData();
    formData.append('status_peralatan', PengambilaAlatType.COMPLETED);
    formData.append('image_pengajuan_alat', uploadImage);

    mutatePengajuanAlat(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onModalClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent mx="4" as="form">
        <Box>
          <ModalBody>
            <VStack>
              <Box py="2" borderBottomWidth={2} w="full">
                <Text fontWeight="semibold" fontSize="xl">
                  Upload Bukti Pengajuan
                </Text>
              </Box>
              <Box py="2" w="full">
                <Text>Silahkan Unggah Bukti Pengajuan Peralatan</Text>
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
                onClick={handleClick}
              >
                {selectedFile ? (
                  <Image src={selectedFile} alt="Choose File Images" />
                ) : (
                  <>
                    <Text>Tarik dan Lepaskan kesini atau </Text>
                    <Box cursor="pointer">
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
            <ButtonGroup>
              <Button onClick={onModalClose} border="1px">
                Batal
              </Button>
              <Button
                isLoading={isLoadingPengajuanAlat}
                isDisabled={disabledButton}
                onClick={hadlePengajuanAlat}
                variant="lateksil-solid"
              >
                Kirim
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default PengajuanAlatModal;
