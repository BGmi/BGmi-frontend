import { AspectRatio, Box, Grid } from '@chakra-ui/react';
import Skeleton from './skeleton';

function FallbackCard() {
  return (
    <Box>
      <AspectRatio ratio={3 / 4}>
        <Skeleton borderRadius="card" />
      </AspectRatio>
      <Skeleton mt="3" h="4" w="80%" />
    </Box>
  );
}

export default function FallbackBangumi() {
  const renderBox: JSX.Element[] = [];

  for (let i = 0; i < 12; ++i) {
    renderBox.push(<FallbackCard key={i} />);
  }

  return (
    <div>
      <Grid templateColumns="repeat(auto-fill, minmax(11rem, 1fr))" gap={{ base: 4, md: 6 }}>
        {...renderBox}
      </Grid>
    </div>
  );
}
