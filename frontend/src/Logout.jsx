import React from 'react';
import { Center, Flex, Heading, Text } from '@chakra-ui/react'
import CustomButton from "./CustomButton";

const Logout = ({ onSuccess }) => {
  return (
    <Center w="100%" h="100vh">
      <Flex direction="column" w="20%">
        <Heading>Enhorabuena!!</Heading>
        <br />
        <Text>Su voto ha sido realizado con exito!</Text>
        <br />
        <CustomButton onClick={onSuccess} label="Finalizar" />
      </Flex>
    </Center>
  );
}

export default Logout;
