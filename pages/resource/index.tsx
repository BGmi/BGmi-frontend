import { Box, Link, Stack } from '@chakra-ui/react';

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
