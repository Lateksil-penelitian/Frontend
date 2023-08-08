import { useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Spacer,
  useBoolean,
  FormErrorMessage,
  Alert,
  AlertIcon,
  useDisclosure,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { getServerSidePropsWithNoAuth } from '../utils/getServerSidePropsWithNoAuth';
import { loginSchema } from '../utils/schema/AuthenticationSchema';
import useAxios from '../components/hooks/useAxios';
import useAuthUserStore from '../store/useAuthUserStore';
import AuthenticationLayout from '../components/main/AuthenticationLayout';
import Head from 'next/head';

const LoginPage = () => {
  const router = useRouter();
  const [errors, setErrors] = useState();
  const [isLoading, setIsloading] = useBoolean();
  const { isOpen: isPasswordOpen, onToggle: onPasswordToggle } =
    useDisclosure();

  const { register, formState, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [, makeLogin] = useAxios(
    { url: '/auth/login', method: 'POST' },
    { manual: true }
  );

  const setLogin = useAuthUserStore((state) => state.setLogin);

  const onSubmit = async (data) => {
    setIsloading.on();
    await makeLogin({ data })
      .then(async (response) => {
        const { email, createToken } = response.data;
        await setLogin(email, createToken);
        router.reload('/');
      })
      .catch((error) => {
        setIsloading.off();
        setErrors(error.response?.data.message);
      });
  };

  return (
    <Stack
      spacing={4}
      w="full"
      maxW="md"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Head>
        <title>Login | Lateksil</title>
      </Head>
      <Heading fontSize="2xl">Masuk</Heading>
      {errors && (
        <Alert status="error" variant="left-accent">
          <AlertIcon />
          {errors}
        </Alert>
      )}
      <FormControl
        id="email"
        isInvalid={!!formState.errors?.email}
        errortext={formState.errors?.email?.message}
      >
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="Email" {...register('email')} />
        <FormErrorMessage fontSize="xs">
          {formState.errors?.email?.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl
        id="password"
        isInvalid={!!formState.errors?.password}
        errortext={formState.errors?.password?.message}
      >
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Password"
            type={isPasswordOpen ? 'text' : 'password'}
            {...register('password')}
          />
          <InputRightElement>
            <IconButton
              bg="transparent"
              _hover={{ bg: 'transparent' }}
              variant="ghost"
              color="ims-linebox"
              aria-label={isPasswordOpen ? 'Mask password' : 'Reveal password'}
              icon={isPasswordOpen ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
              onClick={onPasswordToggle}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage fontSize="xs">
          {formState.errors?.password?.message}
        </FormErrorMessage>
      </FormControl>
      <Flex>
        <Spacer />
        <Link href="/forget-password" color="blue.500">
          Lupa Password?
        </Link>
      </Flex>
      <Button type="submit" isLoading={isLoading} variant="lateksil-solid">
        Masuk
      </Button>
      <Text textAlign="center" mt="8">
        Belum memiliki akun?{' '}
        <Text as="span" color="blue.600" fontWeight="bold">
          <NextLink href="/register">Daftar</NextLink>
        </Text>
      </Text>
    </Stack>
  );
};

export const getServerSideProps = getServerSidePropsWithNoAuth;

LoginPage.getLayout = (page) => (
  <AuthenticationLayout>{page}</AuthenticationLayout>
);

export default LoginPage;
