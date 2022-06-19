import { Button } from '@chakra-ui/react'

const CustomButton = ({ onClick, label }) => <Button onClick={onClick}>{label}</Button>;

export default CustomButton;