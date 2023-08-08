import { useToast } from '@chakra-ui/react';

const useToastNotification = () => {
  const toast = useToast();
  const useToastNotification = (title, status) => {
    toast({
      title,
      status,
      isClosable: true,
      position: 'top',
    });
  };

  return useToastNotification;
};

export default useToastNotification;
