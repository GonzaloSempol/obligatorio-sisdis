/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useState, forwardRef } from 'react';
import {
  Button,
  Center,
  Flex,
  useToast,
  Heading,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { CalendarIcon } from '@chakra-ui/icons';
import { httpClient } from './httpClient';
import CustomButton from './CustomButton';

const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

const CalendarInput = forwardRef(({ value, onClick }, ref) => (
  <Button
    leftIcon={<CalendarIcon />}
    colorScheme="blue"
    variant="solid"
    onClick={onClick}
    ref={ref}
  >
    {value}
  </Button>
));

const submit = async ({ data, onSuccess, onExit, toastError }) => {
  const { startDate, endDate } = data;
  if (startDate > endDate) {
    return toastError({
      description: 'La fecha de finalizacion debe ser mayor a la de inicio',
    });
  }
  try {
    return await httpClient.post('/votar', { ...data }) && onSuccess();
  } catch ({ response: { status, data: description } }) {
    const mensaje = status === 409 ? description : `Ha ocurrido un error de status ${status}, por favor intente mas tarde`;
    toastError({
      title: 'Error',
      description: mensaje,
    });
    onExit();
  }
};

const Config = ({ onSuccess, onExit }) => {
  const now = dayjs().tz('America/Montevideo');
  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(now.add(1, 'hour').toDate());

  const toast = useToast({
    position: 'top',
    status: 'error',
    duration: 5000,
    isClosable: true,
  });

  const toastError = ({ title, description }) => toast({
    title, description,
  });

  return (
    <Center w="100%" h="100vh">
      <Flex direction="column" w="50%" gap={30}>
        <Flex justify="center">
          <Heading alignContent="center">Configuracion de elecciones</Heading>
        </Flex>

        <Flex direction="row" gap={30} justify="space-between">
          <Flex direction="column" gap={30} align="center">
            <Heading size="lg">Inicio</Heading>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(dayjs(date).tz('America/Montevideo').toDate())}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              customInput={<CalendarInput />}
            />
          </Flex>

          <Flex direction="column" gap={30} align="center">
            <Heading size="lg">Fin</Heading>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(dayjs(date).tz('America/Montevideo').toDate())}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
              customInput={<CalendarInput />}
            />
          </Flex>

        </Flex>
        <Flex justify="space-around">
          <CustomButton
            onClick={() => submit({
              onSuccess,
              toastError,
              data: {
                startDate,
                endDate,
              },
            })}
            label="Setear"
          />
          <CustomButton
            onClick={onExit}
            label="Salir"
          />
        </Flex>
      </Flex>
    </Center>
  );
};

export default Config;
