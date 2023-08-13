import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';

const MainPenugujianCardGrid = ({ children, ...props }) => {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 3, xl: 4 }}
      gap="6"
      {...props}
    >
      {children}
    </SimpleGrid>
  );
};

export default MainPenugujianCardGrid;
