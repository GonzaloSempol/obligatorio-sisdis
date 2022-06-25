/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from '@chakra-ui/react';

const CustomButton = ({ onClick, label }) => <Button onClick={onClick}>{label}</Button>;

export default CustomButton;
