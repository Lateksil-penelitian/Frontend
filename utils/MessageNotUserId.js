import { Box, Center, Flex, Text } from '@chakra-ui/layout';
import NextImage from '../components/core/nextimage';
import LateksilImage from '.././assets/images/testing-ilustrator.jpg';

const MessageNotUserId = () => {
  return (
    <Center my="6">
      <Flex maxW="sm" flexDir="column" align="center">
        <Box width={200} height={200}>
          <NextImage
            src={LateksilImage}
            alt="Civil Engginering Illustration"
            layout="responsive"
            placeholder="blur"
          />
        </Box>
        <Text textAlign="center" fontWeight="semibold">
          Belum Ada Pengujian? Silahkan Masuk Terlebih Dahulu
        </Text>
      </Flex>
    </Center>
  );
};

export default MessageNotUserId;
