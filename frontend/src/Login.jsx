/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Input, Center, Flex, useToast } from '@chakra-ui/react';
import { httpClient } from './httpClient';
import CustomButton from './CustomButton';

const submit = async ({ data, onSuccess, onError, toastError }) => {
  const { ci, password } = data;
  if (!ci || !password) {
    return toastError({
      description: 'Complete todos los campos',
    });
  }
  try {
    return await httpClient.post('/login', { ...data }) && onSuccess();
  } catch ({ response: { status, data: description } }) {
    if (status === 401) {
      onError();
      toastError({
        title: 'Error',
        description,
      });
    } else {
      toastError({
        title: 'Error',
        description: `Ha ocurrido un error de status ${status}, por favor intente mas tarde`,
      });
    }
  }
};

const Login = ({ onSuccess }) => {
  const [ci, setCi] = useState('1000002');
  const [password, setPassword] = useState('contrasenia2');

  const toast = useToast({
    position: 'top',
    status: 'error',
    duration: 5000,
    isClosable: true,
  });

  const toastError = ({ title, description }) => toast({ title, description });

  const onError = () => {
    setCi('');
    setPassword('');
  };

  return (
    <Center w="100%" h="100vh">
      <Flex direction="column" w="20%">

        <label htmlFor="ci">Cedula</label>
        <br />
        <Input type="text" id="ci" value={ci} onChange={e => setCi(e.target.value)} />

        <br />
        <label htmlFor="pass">Contraseña</label>
        <br />
        <Input type="password" id="pass" value={password} onChange={e => setPassword(e.target.value)} />
        <br />
        <CustomButton onClick={() => submit({ onSuccess, data: { ci, password }, onError, toastError })} label="Login" />
      </Flex>
    </Center>
  );
};

export default Login;
