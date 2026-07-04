import { Box, Link, Stack, Text } from '@chakra-ui/react';

export default function Resource() {
  return (
    <Box maxW="3xl">
      <Text fontSize="2xl" fontWeight="semibold">
        Resource
      </Text>
      <Text mt="2" color="gray.500">
        可订阅的 BGmi 外部资源。
      </Text>
      <Stack mt="6" spacing="3">
        <Link
          href="./resource/feed.xml"
          target="_blank"
          p="4"
          borderWidth="1px"
          borderRadius="card"
          _hover={{ textDecoration: 'none', borderColor: 'red.300' }}
        >
          <Text fontWeight="semibold">RSS Feed</Text>
          <Text mt="1" color="gray.500" fontSize="sm">
            下载更新订阅源
          </Text>
        </Link>
        <Link
          href="./resource/calendar.ics"
          target="_blank"
          p="4"
          borderWidth="1px"
          borderRadius="card"
          _hover={{ textDecoration: 'none', borderColor: 'red.300' }}
        >
          <Text fontWeight="semibold">ICS Calendar</Text>
          <Text mt="1" color="gray.500" fontSize="sm">
            移动设备和日历应用订阅
          </Text>
        </Link>
      </Stack>
    </Box>
  );
}
