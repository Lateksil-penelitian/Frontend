import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { baseUrl } from '../../../../libs/axios';
import { PengerjaanTypes } from '../../../../utils/enum/PengerjaanTypes';
import StatusPeralatan from '../../../core/status/StatusPeralatan';
import StatusProgresTeknisi from '../../../core/status/StatusProgresTeknisi';
import useRemoteStatusPeralatan from '../../../hooks/remote/useRemoteStatusPeralatan';
import useRemoteTeknisibyOrderId from '../../../hooks/remote/useRemoteTeknisibyOrderId';

const DetailTeknisiProgress = ({ id, isOpen, onClose }) => {
  const router = useRouter();
  const { data: dataTeknisi, isLoading: isLoadingDataTeknisi } =
    useRemoteTeknisibyOrderId({ id });

  const { data: dataStatusPeralatan, isLoading: isLoadingStatusPeralatan } =
    useRemoteStatusPeralatan({
      id,
    });

  const onModalClose = () => {
    onClose();
  };

  const { color: color_peralatan, text: text_peralatan } = StatusPeralatan({
    status: dataStatusPeralatan?.data.status_peralatan,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onModalClose}
      size="xl"
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay />
      <ModalContent mx="4">
        <ModalHeader>
          <Text>Detail Progress Teknisi & Peralatan</Text>
        </ModalHeader>
        <ModalCloseButton />
        <Box overflow="auto">
          <ModalBody py="5">
            <Flex direction="column">
              <Flex align="center" mb="5">
                <Text fontWeight="semibold">Status Peralatan : </Text>
                {isLoadingStatusPeralatan ? (
                  <Skeleton ml="3" w="28" h="7" />
                ) : (
                  <Badge
                    ml="3"
                    p="2"
                    colorScheme={color_peralatan}
                    rounded="md"
                  >
                    {text_peralatan}
                  </Badge>
                )}
              </Flex>
              <TableContainer w="full">
                <Table size="md" variant="striped">
                  <Thead>
                    <Tr>
                      <Th textAlign="center">Nama Teknisi</Th>
                      <Th textAlign="center">Status</Th>
                      <Th textAlign="center">File</Th>
                    </Tr>
                  </Thead>
                  <Tbody borderWidth={2}>
                    {dataTeknisi?.data?.map((users, i) => {
                      const { color: color_pengerjaan, text: text_pengerjaan } =
                        StatusProgresTeknisi({
                          status: users.status_pengerjaan,
                        });
                      return (
                        <Tr key={i}>
                          <Td textAlign="center">{users.teknisi.full_name}</Td>
                          <Td textAlign="center">
                            <Badge
                              colorScheme={color_pengerjaan}
                              p="2"
                              rounded="md"
                              w="full"
                            >
                              {text_pengerjaan}
                            </Badge>
                          </Td>
                          <Td textAlign="center">
                            <Button
                              isDisabled={
                                users.status_pengerjaan ===
                                PengerjaanTypes.COMPLETED
                                  ? false
                                  : true
                              }
                              colorScheme="blue"
                              onClick={() =>
                                router.push(
                                  `${baseUrl}view-task/download/${users.file_task_pengujian}`
                                )
                              }
                            >
                              Download File
                            </Button>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
              {isLoadingDataTeknisi && (
                <Stack w="full">
                  <Skeleton height="25px" />
                  <Skeleton height="25px" />
                </Stack>
              )}
            </Flex>
          </ModalBody>
        </Box>
        <ModalFooter bg="gray.100">
          <ButtonGroup>
            <Button onClick={onModalClose} border="1px">
              Batal
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DetailTeknisiProgress;
