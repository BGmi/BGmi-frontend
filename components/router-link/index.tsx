import type { LinkProps } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';

import NextLink from 'next/link';

export default function Link(props: LinkProps) {
  return (
    <ChakraLink as={NextLink} href={props.href} _hover={{ textDecoration: 'none' }} {...props}>
      {props.children}
    </ChakraLink>
  );
}
