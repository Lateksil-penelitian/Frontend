import React from 'react';
import { Box, Card } from '@chakra-ui/react';
import MainCardPengujianBase from '../mainCardPengujiaBase';

const MainCardPengujian = ({ pengujian, isLoading, ...props }) => {
  return (
    <Card shadow="md" {...props}>
      <Box h="full">
        <MainCardPengujianBase pengujian={pengujian} isLoading={isLoading} />
      </Box>
    </Card>
  );
};

export default MainCardPengujian;
