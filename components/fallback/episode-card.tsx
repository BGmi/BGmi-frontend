import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import Skeleton from './skeleton';
import { useColorMode } from '~/hooks/use-color-mode';

export default function FallbackEpisodeCard() {
  const { colorMode } = useColorMode();

  const skeletonItems: JSX.Element[] = [];

  for (let i = 0; i < 10; ++i) {
    skeletonItems.push(
      <GridItem key={i}>
        <Skeleton
          px="7"
          maxW="16"
          fontSize="sm"
     />
      </GridItem>
    );
  }
  return (
    <Box
      bg={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'}
      p="4"
      ml={{ xl: '4', base: 'unset' }}
      mt={{ xl: 'unset', base: '4' }}
      w={{ xl: '30%', base: 'unset' }}
      h="50%"
  >
      <Text mb="4">选集</Text>
      <Grid templateColumns="repeat(auto-fill, minmax(3.75rem, 1fr))" gap={6}>
        {...skeletonItems}
      </Grid>
    </Box>
  );
}
