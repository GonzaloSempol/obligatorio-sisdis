import React, { useEffect, useState } from 'react';
import { httpClient } from './httpClient';
import CustomButton from './CustomButton';
import {
  Center,
  Flex,
  useToast,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Heading,
} from '@chakra-ui/react'


const Results = ({ onSuccess, onExit }) => {
  const [votos, setVotos] = useState([]);

  const toast = useToast({
    position: 'top',
    status: 'error',
    duration: 5000,
    isClosable: true,
  });

  const toastError = ({ title, description }) => toast({ title, description })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await httpClient.get('/votos');
        setVotos(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData().catch(console.error);
  }, []);

  return (
    <Center w="100%" h="100vh">
      <Flex direction="column" w="50%" gap={30}>
        <Heading>Resultados elecciones</Heading>
        <StatGroup gap={20}>
          {votos.map(({ _id: partido, count: numVotos }) => {
            return (
              <Stat>
                <StatLabel>{partido}</StatLabel>
                <StatNumber>{numVotos}</StatNumber>
              </Stat>
            )
          })}
        </StatGroup>

        <Flex direction="row-reverse">
          <CustomButton
            onClick={onExit}
            label="Salir"
          />
        </Flex>

      </Flex>
    </Center>
  )

}

export default Results;
