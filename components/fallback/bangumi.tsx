import { Box, Grid } from '@chakra-ui/react';
import Skeleton from './skeleton';

function FallbackCard() {
  return (
    <Box
      roundedTop="md"
      mx="2"
      boxShadow="base"
      >
      <Skeleton
        h="48"
        roundedTop="md"
      />
      <Box minH="5.5rem" p="4" bg="whiteAlpha.100" />
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
