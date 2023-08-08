import { Box } from '@chakra-ui/react';
import DashboardNavbar from '../DashboardNavbar';

const DashboardMain = ({ children }) => (
  <Box as="main" flexGrow={1} minH="100vh" overflow="hidden">
    <DashboardNavbar />
    <Box p="5">{children}</Box>
  </Box>
);

export default DashboardMain;
