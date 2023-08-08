import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Document, Page, pdfjs } from 'react-pdf';
import useToastNotification from '../../../hooks/useToastNotification';
import useMutationAddResultPengujian from '../../../hooks/mutation/useMutationAddResultPengujian';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const UploadResultPengujianModal = ({ id, isOpen, onClose }) => {
  const showToast = useToastNotification();
  const [selectedFile, setSelectedFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    mutateAsync: mutateUploadResultFilePengujian,
    isLoading: isLoadingUploadResultPengujian,
  } = useMutationAddResultPengujian();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setCurrentPage(1);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const onCloseUploaded = () => {
    setSelectedFile(null);
    onClose();
  };

  const handleUploadResultPengujian = async () => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('file_result_pengujian', selectedFile);

    try {
      await mutateUploadResultFilePengujian(formData);
    } catch (error) {
      showToast('Gagal memperbarui data', 'error');
    } finally {
      onCloseUploaded();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseUploaded}
      isCentered
      size="3xl"
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
                Upload Result Pengujian PDF*
              </Text>
            </Box>
            <Box py="2" borderBottomWidth={2} w="full">
              {selectedFile && (
                <Flex direction="column" alignItems="end">
                  <ButtonGroup>
                    <Button
                      size="sm"
                      colorScheme="teal"
                      mt={2}
                      onClick={goToPreviousPage}
                      disabled={currentPage <= 1}
                      style={{ marginRight: '5px' }}
                    >
                      Previous
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="teal"
                      mt={2}
                      onClick={goToNextPage}
                      disabled={currentPage >= numPages}
                      style={{ marginLeft: '5px' }}
                    >
                      Next
                    </Button>
                  </ButtonGroup>
                  <Text mt={2}>
                    Page {currentPage} of {numPages}
                  </Text>
                </Flex>
              )}
            </Box>
            <Box
              border="2px dashed #ccc"
              borderRadius="5px"
              textAlign="center"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              mb={5}
              p={0}
              m={0}
            >
              {selectedFile ? (
                <Box>
                  <Document
                    file={selectedFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={currentPage} />
                  </Document>
                </Box>
              ) : (
                <Box>
                  <Text>Drag and drop file here</Text>
                  <Button
                    size="sm"
                    colorScheme="teal"
                    mt={3}
                    onClick={() =>
                      document.querySelector('input[type="file"]').click()
                    }
                  >
                    Select File
                  </Button>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                </Box>
              )}
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter bg="gray.100">
          <ButtonGroup display="flex" flexGrow={1}>
            <Button
              flexGrow={1}
              rounded="md"
              onClick={onCloseUploaded}
              border="1px"
            >
              Tutup
            </Button>
            <Button
              isDisabled={selectedFile ? false : true}
              isLoading={isLoadingUploadResultPengujian}
              flexGrow={1}
              onClick={handleUploadResultPengujian}
              rounded="md"
              variant="lateksil-solid"
            >
              Selesai
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadResultPengujianModal;
