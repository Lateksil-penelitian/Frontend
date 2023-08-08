import { Center } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';

const LoadingData = () => {
  return (
    <Center py="12">
      <Spinner />
    </Center>
  );
};

export default LoadingData;
