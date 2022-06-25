/* eslint-disable react/prop-types */
import React from 'react';
import { Center, Flex, Heading, Text } from '@chakra-ui/react';
import CustomButton from './CustomButton';

const Logout = ({ onSuccess }) => (
  <Center w="100%" h="100vh">
    <Flex direction="column" w="20%">
      <Heading>Enhorabuena!!</Heading>
      <br />
      <Text> Las votaciones estan abiertas!</Text>
      <br />
      <CustomButton onClick={onSuccess} label="Finalizar" />
    </Flex>
  </Center>
);

export default Logout;
