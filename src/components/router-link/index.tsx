import type { LinkProps } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router-dom';

export default function Link(props: LinkProps) {
  return (
    <ChakraLink as={RouteLink} {...props} _hover={{ textDecoration: 'none' }} to={props.href}>
      {props.children}
    </ChakraLink>
  );
}
