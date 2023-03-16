import { Box, Grid, Spinner } from '@chakra-ui/react';
import Skeleton from './skeleton';

import { useColorMode } from '~/hooks/use-color-mode';

function FallbackCard() {
  const { colorMode } = useColorMode();
  return (
    <Box
      roundedTop="md"
      mx="2"
      boxShadow="base"
      >
      <Skeleton
        h="48"
        roundedTop="md"
        startColor={colorMode === 'light' ? 'gray.500' : 'blackAlpha.900'}
        endColor={colorMode === 'light' ? 'gray.900' : 'blackAlpha.500'}
      />
      <Box minH="5.5rem" p="4" bg="whiteAlpha.100">
        <Spinner />
      </Box>
    </Box>
  );
}

export default function FallbackBangumi() {
  const renderBox: JSX.Element[] = [];

  for (let i = 0; i < 12; ++i) {
    renderBox.push(
      <FallbackCard key={i} />
    );
  }

  return (
    <div>
      <Grid templateColumns="repeat(auto-fill, minmax(20rem, 1fr))" gap={6}>
      {...renderBox}
      </Grid>
    </div>
  );
}
