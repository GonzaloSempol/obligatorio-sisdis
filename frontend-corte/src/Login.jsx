/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Input, Center, Flex, useToast } from '@chakra-ui/react';
import { parse, format } from 'fecha';
import { httpClient } from './httpClient';
import CustomButton from './CustomButton';

const submit = async ({ data, onSuccess, onSetup, onError, toastError }) => {
  const { usuario, password } = data;
  if (!usuario || !password) {
    return toastError({
      description: 'Complete todos los campos',
    });
  }

  try {
    // deberia chequearse luego de loguearse no antes, sino hay que hacer /config publico
    //
    const loginResponse = await httpClient.post('/login', { ...data });
    if (loginResponse.status === 200) {
      const { data: configResponse } = await httpClient.get('/config');
      if (configResponse.habilitadoVerVotos) {
        return onSuccess();
      }
      if (configResponse.habilitadoConfigurar) {
        return onSetup();
      }
    }

    // return
  } catch ({ response: { status, data: description } }) {
    if (status === 401) {
      onError();
      if (description.habilitadoVerVotos === false) {
        const fechaFormat = format(parse(description.endDate, 'isoDateTime', 'YYYY-MM-DD hh:mm:ss'));

        toastError({
          title: 'Error',
          description: (`La votacion finalizará el: ${fechaFormat}`),
        });
      } else {
        toastError({
          title: 'Error',
          description,
        });
      }
    } else {
      toastError({
        title: 'Error',
        description: `Ha ocurrido un error de status ${status}, por favor intente mas tarde`,
      });
    }
  }
};

const Login = ({ onSuccess, onSetup }) => {
  const [usuario, setUsuario] = useState('CorteElectoral');
  const [password, setPassword] = useState('CorteElectoral');

  const toast = useToast({
    position: 'top',
    status: 'error',
    duration: 5000,
    isClosable: true,
  });

  const toastError = ({ title, description }) => toast({ title, description });

  const onError = () => {
    setUsuario('');
    setPassword('');
  };

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
        <CustomButton onClick={() => submit({ onSuccess, onSetup, data: { usuario, password }, onError, toastError })} label="Login" />
      </Flex>
    </Center>
  );
};

export default Login;
