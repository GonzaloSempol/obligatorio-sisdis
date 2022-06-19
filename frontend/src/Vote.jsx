import React, { useEffect, useState } from 'react';
import { httpClient } from './httpClient';
import CustomButton from './CustomButton';
import { Spacer, RadioGroup, Stack, Radio, Center, Flex } from '@chakra-ui/react'

const submit = async ({ data, onSuccess, onExit }) => {
  const { partido } = data;
  if (!partido) {
    return window.alert("Selecciona partido")
  }
  try {
    return await httpClient.post('/votar', { ...data }) && onSuccess();
  } catch ({ response: { status, data } }) {
    const mensaje = status === 409 ? data : `Ha ocurrido un error de status ${status}, por favor intente mas tarde`;
    window.alert(mensaje)
    onExit()
  }
}

const Vote = ({ onSuccess, onExit }) => {
  const [partidos, setPartidos] = useState([]);
  const [voto, setVoto] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await httpClient.get('/partidos');
        setPartidos(data);
      } catch (error) {
        console.log('error');
        console.log(error);
      }
    }
    fetchData().catch(console.error);
  }, []);

  return (
    <Center w="100%" h="100vh">
      <Flex direction="column" w="20%">
      
        <RadioGroup onChange={setVoto} value={voto}>
          <Stack direction='column'>

            {partidos.map((partido) => {
              return (
                <>
                  <Radio value={partido}>{partido}</Radio>
                  <br />
                </>
              )
            })}

          </Stack>
          </RadioGroup>
        <Flex>
            <CustomButton
            onClick={() => submit({
              onSuccess, onExit, data: {
                partido: voto,
                departamento: "Montevideo",
                circuito: "A1001"
              }
            })}
            label="Votar"
          />
          <Spacer/>
          <CustomButton
            onClick={onExit}
            label="Salir"
          /> 
        </Flex>
      
      </Flex>
    </Center>
  )

}

export default Vote;
