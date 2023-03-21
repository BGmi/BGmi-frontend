import { Box, Link, Stack } from '@chakra-ui/react';
import Layout from '~/components/layout';

export default function Resource() {
  // 与原来保持一致
  return (
    <Box>
      <Stack spacing="2">
        <Link href="/resource/feed.xml" target="_blank" color="blue.200">Rss Feed</Link>
        <Link href="/resource/calendar.ics" target="_blank" color="blue.200">ICS Calendar for mobile phone</Link>
      </Stack>
    </Box>
  );
}

Resource.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
