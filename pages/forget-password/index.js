import {
  Button,
  Center,
  Circle,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { MdMailLock } from 'react-icons/md';
import AuthenticationLayout from '../../components/main/AuthenticationLayout';

const MainForgetPassword = () => {
  return (
    <Stack spacing={4} w="full" maxW="md" as="form">
      <Center>
        <VStack>
          <Circle size="50px" bg="blue.700" color="white">
            <MdMailLock size={30} />
          </Circle>
          <Heading fontSize="2xl">Lupa Kata Sandi?</Heading>
          <Text
            mb={5}
            w="80%"
            align="center"
            fontWeight="medium"
            fontFamily="body"
          >
            Masukan email yang terdaftar di akun Lateksil kamu dan kami akan
            mengirimkan email untuk mereset kata sandi baru
          </Text>
        </VStack>
      </Center>
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="Email" />
      </FormControl>
      <Button type="submit" variant="lateksil-solid">
        Reset Email
      </Button>
    </Stack>
  );
};

MainForgetPassword.getLayout = (page) => (
  <AuthenticationLayout>{page}</AuthenticationLayout>
);

export default MainForgetPassword;
