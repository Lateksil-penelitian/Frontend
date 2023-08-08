import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { PengerjaanTypes } from '../../../../utils/enum/PengerjaanTypes';
import { TaskTeknisiTypes } from '../../../../utils/enum/TaskTeknisiType';
import useMutationProgressTaskPengujian from '../../../hooks/mutation/useMutationProgressTaskPengujian';
import useToastNotification from '../../../hooks/useToastNotification';

const UploadFilePengujianTeknisi = ({ id, isOpen, onClose }) => {
  const router = useRouter();
  const showToast = useToastNotification();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const {
    mutateAsync: mutateTaskToComplete,
    isLoading: isLoadingTaskProgress,
  } = useMutationProgressTaskPengujian();

  const onClickTaskToInReport = async () => {
    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('status_task', TaskTeknisiTypes.TASK_COMPLETED);
      formData.append('status_pengerjaan', PengerjaanTypes.UPLOADED_FILE);
      formData.append('file_task_pengujian', selectedFile);

      await mutateTaskToComplete(formData).then(() =>
        router.push('/teknisi/report')
      );
    } catch (error) {
      showToast('Gagal memperbarui data', 'error');
    }
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
                Upload File Pengujian
              </Text>
            </Box>
            <Box p={4} w="full">
              <VStack spacing={4} align="stretch">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  style={{
                    border: '1px solid gray',
                    padding: '8px',
                    borderRadius: '10px',
                  }}
                />
              </VStack>
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
              isLoading={isLoadingTaskProgress}
              onClick={onClickTaskToInReport}
            >
              Upload
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadFilePengujianTeknisi;
