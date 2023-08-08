import React from 'react';
import Link from 'next/link';
import {
  Box,
  Collapse,
  Flex,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ViChevronBack, ViChevronForward } from '../../core/icons';

const DashboardSidebarItem = ({ item, pathname }) => {
  const isActive = item.sub
    ? item.sub.some((subItem) => subItem.path === pathname)
    : item.path === pathname;

  const isActiveIdPath = item.path + `/[id]` === pathname;

  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: isActive });

  if (item.sub)
    return (
      <React.Fragment>
        <Flex
          align="stretch"
          alignItems="center"
          borderLeftColor={isActive ? 'blue.700' : 'transparent'}
          borderLeftWidth={4}
          p="3"
          bg={isActive ? 'blue.500' : undefined}
          color={isActive ? 'white' : 'grey'}
          onClick={onToggle}
          cursor="pointer"
          transitionProperty="common"
          transitionDuration="normal"
        >
          <Box ml="2" mr="4" color={isActive ? 'white' : 'grey'}>
            <Icon as={item.icon} />
          </Box>
          <Text fontSize="md">{item.name}</Text>
          <Box ml="auto">
            {isOpen ? <ViChevronBack /> : <ViChevronForward />}
          </Box>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          {item.sub.map((subItem, index) => (
            <React.Fragment key={index}>
              <Link href={subItem.path} passHref>
                <Text
                  display="block"
                  p="2"
                  bg={isActive ? 'grey.100' : undefined}
                  color={subItem.path === pathname ? 'white' : 'grey'}
                  bgColor={subItem.path === pathname && 'blue.800'}
                  pl="14"
                  transitionProperty="common"
                  transitionDuration="normal"
                  _hover={{
                    bg: 'blue.500',
                    color: 'white',
                  }}
                >
                  {subItem.name}
                </Text>
              </Link>
            </React.Fragment>
          ))}
        </Collapse>
      </React.Fragment>
    );
  return (
    <React.Fragment>
      <Link href={item.path} passHref>
        <Flex
          align="stretch"
          alignItems="center"
          borderLeftColor={
            isActive || isActiveIdPath ? 'blue.700' : 'transparent'
          }
          borderLeftWidth={4}
          p="3"
          bg={isActive || isActiveIdPath ? 'blue.600' : undefined}
          color={isActive || isActiveIdPath ? 'white' : 'grey'}
          transitionProperty="common"
          transitionDuration="normal"
        >
          <Box
            ml="2"
            mr="4"
            color={isActive || isActiveIdPath ? 'white' : 'grey'}
          >
            <Icon as={item.icon} />
          </Box>
          <Text fontSize="md">{item.name}</Text>
        </Flex>
      </Link>
    </React.Fragment>
  );
};

export default DashboardSidebarItem;
