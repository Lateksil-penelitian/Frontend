/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect } from 'react';
import { useBreakpointValue, useDisclosure } from '@chakra-ui/react';

const DashboardContext = createContext();

export function useDashboard() {
  return useContext(DashboardContext);
}

const DashboardProvider = ({ children }) => {
  const { isOpen: isDesktopSidebarOpened, onToggle: onDesktopSidebarOpen } =
    useDisclosure({ defaultIsOpen: true });
  const {
    isOpen: isMobileSidebarOpened,
    onToggle: onMobileSidebarOpen,
    onClose: onMobileSidebarClose,
  } = useDisclosure({ defaultIsOpen: false });
  const isDesktop = useBreakpointValue({ base: false, md: false, xl: true });

  function onToggle() {
    if (isDesktop) return onDesktopSidebarOpen();
    return onMobileSidebarOpen();
  }

  useEffect(() => {
    if (isDesktop) onMobileSidebarClose();
  }, [isDesktop]);
  return (
    <DashboardContext.Provider
      value={{
        isDesktopSidebarOpened,
        isMobileSidebarOpened,
        onSidebarToggle: onToggle,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
