import React, { useState } from 'react';
import NextLink from 'next/link';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useBoolean,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../utils/schema/AuthenticationSchema';
import useAxios from '../components/hooks/useAxios';
import { useRouter } from 'next/router';
import AuthenticationLayout from '../components/main/AuthenticationLayout';
import useToastNotification from '../components/hooks/useToastNotification';
import Head from 'next/head';

const RegisterPage = () => {
  const router = useRouter();
  const showToast = useToastNotification();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsloading] = useBoolean();
  const { isOpen: isPasswordOpen, onToggle: onPasswordToggle } =
    useDisclosure();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const [, makeRegister] = useAxios(
    { url: '/auth/register', method: 'POST' },
    { manual: true }
  );

  const onSubmit = (data) => {
    setIsloading.on();
    makeRegister({ data })
      .then(() => {
        showToast('Pendaftaran berhasil', 'success');
        router.push('/login');
      })
      .catch((error) => {
        setIsloading.off();
        setErrorMessage(error.response?.data.message);
      });
  };

  return (
    <Box as="form" w="full" maxW="md" onSubmit={handleSubmit(onSubmit)}>
      <Head>
        <title>Registrasi | Lateksil</title>
      </Head>
      <VStack mb="3" w="full">
        <Heading fontSize="2xl" w="full">
          Daftar Sekarang
        </Heading>
        <Text mb="8" w="full">
          Sudah memiliki akun?
          <Text as="span" color="blue.600" fontWeight="bold">
            <NextLink href="/login">Masuk</NextLink>
          </Text>
        </Text>
        {errorMessage && (
          <Alert mt="4" status="error" variant="left-accent">
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}
      </VStack>
      <VStack w="full" maxW="md">
        <FormControl id="full_name" isInvalid={!!errors.full_name}>
          <FormLabel>Nama Lengkap</FormLabel>
          <Input
            type="text"
            placeholder="Nama Lengkap"
            {...register('full_name')}
          />
          <FormErrorMessage>
            {errors.full_name && errors.full_name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="company_name" isInvalid={!!errors.company_name}>
          <FormLabel>Nama Perusahaan</FormLabel>
          <Input
            type="text"
            placeholder="Nama Perusahaan"
            {...register('company_name')}
          />
          <FormErrorMessage>
            {errors.company_name && errors.company_name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="address" isInvalid={!!errors.address}>
          <FormLabel>Alamat</FormLabel>
          <Input type="text" placeholder="Alamat" {...register('address')} />
          <FormErrorMessage>
            {errors.address && errors.address.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="no_whatsapp" isInvalid={!!errors.no_whatsapp}>
          <FormLabel>No. WhatsApp</FormLabel>
          <Input
            type="text"
            placeholder="No WhatsApp"
            {...register('no_whatsapp')}
          />
          <FormErrorMessage>
            {errors.no_whatsapp && errors.no_whatsapp.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="email" isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Email" {...register('email')} />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="password" isInvalid={!!errors.password}>
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
                aria-label={
                  isPasswordOpen ? 'Mask password' : 'Reveal password'
                }
                icon={
                  isPasswordOpen ? <BsFillEyeFill /> : <BsFillEyeSlashFill />
                }
                onClick={onPasswordToggle}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
      </VStack>
      <Button
        mt="8"
        w="full"
        maxW="md"
        type="submit"
        variant="lateksil-solid"
        isLoading={isLoading}
      >
        Daftar
      </Button>
    </Box>
  );
};

RegisterPage.getLayout = (page) => (
  <AuthenticationLayout>{page}</AuthenticationLayout>
);

export default RegisterPage;
