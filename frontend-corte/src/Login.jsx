import React, { useState } from 'react';
import { httpClient } from './httpClient';
import CustomButton from './CustomButton';
import { Input, Center, Flex, useToast } from '@chakra-ui/react'


const submit = async ({ data, onSuccess, onError, toastError }) => {

  const { usuario, password } = data;
  if (!usuario || !password) {
    return toastError({
      description: "Complete todos los campos"
    })
  }
  try {
    return await httpClient.post('/login', { ...data }) && onSuccess();
  } catch ({ response: { status, data } }) {
    if (status === 401) {
      onError()
      toastError({
        title: "Error",
        description: data
      })
    }
    else {
      toastError({
        title: "Error",
        description: `Ha ocurrido un error de status ${status}, por favor intente mas tarde`
      })
    }
  }

}

const Login = ({ onSuccess }) => {
  const [usuario, setUsuario] = useState('CorteElectoral');
  const [password, setPassword] = useState('CorteElectoral');

  const toast = useToast({
    position: 'top',
    status: 'error',
    duration: 5000,
    isClosable: true,
  });

  const toastError = ({ title, description }) => toast({ title, description })


  const onError = () => {
    setUsuario('');
    setPassword('');
  }

  return (
    <Center w="100%" h="100vh">
      <Flex direction="column" w="20%">

        <label htmlFor="usuario">Usuario</label>
        <br />
        <Input type="text" id="usuario" value={usuario} onChange={e => setUsuario(e.target.value)} />

        <br />
        <label htmlFor="pass">Contraseña</label>
        <br />
        <Input type="password" id="pass" value={password} onChange={e => setPassword(e.target.value)} />
        <br />
        <CustomButton onClick={() => submit({ onSuccess, data: { usuario, password }, onError, toastError })} label="Login" />
      </Flex>
    </Center>
  );
}

export default Login;
