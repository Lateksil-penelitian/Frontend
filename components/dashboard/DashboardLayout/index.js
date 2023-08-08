import { Flex } from '@chakra-ui/react';
import DashboardProvider from '../../../context/dashboard/DashboardProvider';
import generateSidebaritemFrontliner from '../../../utils/sidebar/Frontliner';
import generateSidebaritemKeuangan from '../../../utils/sidebar/Keuangan';
import generateSidebaritemManager from '../../../utils/sidebar/Manager';
import generateSidebaritemPeralatan from '../../../utils/sidebar/Peralatan';
import generateSidebaritemTeknisi from '../../../utils/sidebar/Teknisi';
import generateSidebaritemUser from '../../../utils/sidebar/User';
import DashboardMain from '../DashboardMain';
import DashboardSidebar from '../DashboardSidebar';

const DashboardLayout = ({ sidebarFor, children }) => {
  let sidebarItems = [];

  switch (sidebarFor) {
    case 'manager':
      sidebarItems = generateSidebaritemManager();
      break;
    case 'keuangan':
      sidebarItems = generateSidebaritemKeuangan();
      break;
    case 'frontliner':
      sidebarItems = generateSidebaritemFrontliner();
      break;
    case 'users':
      sidebarItems = generateSidebaritemUser();
      break;
    case 'peralatan':
      sidebarItems = generateSidebaritemPeralatan();
      break;
    case 'teknisi':
      sidebarItems = generateSidebaritemTeknisi();
      break;
    default:
      sidebarItems = generateSidebaritemUser();
      break;
  }

  return (
    <Flex overflow="hidden">
      <DashboardProvider>
        <DashboardSidebar items={sidebarItems} />
        <DashboardMain>{children}</DashboardMain>
      </DashboardProvider>
    </Flex>
  );
};

export default DashboardLayout;
