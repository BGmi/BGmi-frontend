import type { SkeletonProps } from '@chakra-ui/react';
import { Skeleton as ChakraSkeleton } from '@chakra-ui/react';

import { useColorMode } from '~/hooks/use-color-mode';

export default function Skeleton(props: SkeletonProps) {
  const { colorMode } = useColorMode();
  return (
    <ChakraSkeleton
      startColor={colorMode === 'light' ? 'gray.500' : 'blackAlpha.900'}
      endColor={colorMode === 'light' ? 'gray.900' : 'blackAlpha.500'}
      {...props}
     />
  );
}
