import { Icon } from '@chakra-ui/icon';
import { Center, Text, VStack } from '@chakra-ui/layout';
import { RiFolderInfoFill } from 'react-icons/ri';

const MessageNotFoundData = () => {
  return (
    <Center py="12">
      <VStack>
        <Icon as={RiFolderInfoFill} fontSize="xl" />
        <Text fontWeight="semibold">Sorry, Data Not Found!</Text>
      </VStack>
    </Center>
  );
};

export default MessageNotFoundData;
