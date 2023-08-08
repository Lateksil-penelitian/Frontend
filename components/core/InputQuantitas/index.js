import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import formatCurrency from '../../../utils/formatCurrently';

const InputQuantitas = ({ cart }) => {
  const totalPricePengujian = parseInt(cart.quantity) * cart.Pengujian.price;

  return (
    <>
      <Flex>
        <Text textAlign="center" color="blue.700" fontWeight="semibold">
          Total : Rp{formatCurrency(totalPricePengujian)}
        </Text>
      </Flex>
    </>
  );
};

export default InputQuantitas;
