import { Box, Fade, Heading, Highlight, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import Layout from '~/components/layout';

import { useBangumi } from '~/hooks/use-bangumi';
import { useColorMode } from '~/hooks/use-color-mode';

export default function About() {
  const { data } = useBangumi();
  const { colorMode } = useColorMode();
  return (
    <>
      <Heading>BGmi <Fade style={{ display: 'inline' }} in={!!data?.version}>{data?.version}</Fade></Heading>
      <Text mt="2">一个用来追番的命令行程序</Text>
      <Text>
        HTTP Service 基于
        {' '}
        <Link href="https://github.com/BGmi/BGmi" color={colorMode === 'dark' ? 'red.100' : 'red.400'}>
          BGmi
        </Link>
        {' '}
        构建
      </Text>

      <Heading size="md" mb="3" mt="6">有什么特性？</Heading>
      <UnorderedList>
        <ListItem>
          <Highlight
            query={['Bangumi_Moe', 'Mikan_Project', '大马哈鱼']}
            styles={{ px: '1', bg: 'teal.100', rounded: '4px' }}
          >
            多个数据源可选 Bangumi_Moe Mikan_Project 或者 大马哈鱼
          </Highlight>
        </ListItem>
        <ListItem>
          <Highlight
            query={['Aria2', 'Transmission', 'qBittorrent', 'Deluge']}
            styles={{ px: '1', bg: 'red.100', rounded: '4px' }}
          >
            使用 Aria2 Transmission qBittorrent 或者 Deluge 来下载你的番剧
          </Highlight>
        </ListItem>
        {/* <ListItem>弹幕支持</ListItem> */}
        <ListItem>
          <Highlight
            query={['uTorrent', 'RSS Feed', 'ICS']}
            styles={{ px: '1', bg: 'green.100', rounded: '4px' }}
          >
            提供 uTorrent 支持的 RSS Feed 和移动设备支持的 ICS 格式日历
          </Highlight>
        </ListItem>
        <ListItem>
          <Highlight
            query={['Bangumi Script']}
            styles={{ px: '1', bg: 'yellow.100', rounded: '4px' }}
          >
            Bangumi Script 添加自己的番剧解析器
          </Highlight>
        </ListItem>
        <ListItem>下载番剧时的过滤器 支持关键词, 字幕组和正则</ListItem>
        <ListItem>番剧放送列表和剧集信息</ListItem>
        <ListItem>
          <Highlight
            query={['Windows', '*nux', 'Router']}
            styles={{ px: '1', bg: 'orange.200', rounded: '4px' }}
            >
            多平台支持 Windows *nux 以及 Router
          </Highlight>
        </ListItem>
      </UnorderedList>

      <Heading mt="6">BGmi Frontend {process.env.NEXT_PUBLIC_APP_VERSION}</Heading>
      <Text mt="2">
        <Highlight
          query={['Next.js', 'Chakra UI']}
          styles={{ px: '1', bg: 'cyan.100', rounded: '4px' }}
          >
          基于 Next.js Chakra UI 构建
        </Highlight>
      </Text>
      <Text mt="2">
        支持视频历史观看时长记录
      </Text>

      <Heading size="md" mb="3" mt="6">致谢</Heading>
      <UnorderedList>
        <ListItem><Link href="https://bangumi.moe/" color={colorMode === 'dark' ? 'facebook.200' : 'facebook.300'}>萌番组</Link></ListItem>
        <ListItem><Link href="https://mikanani.me/" color="orange.200">蜜柑计划</Link></ListItem>
        <ListItem><Link href="https://aria2.github.io/" color="red.300">Aria2</Link></ListItem>
        <ListItem><Link href="https://github.com/DIYgod/DPlayer" color="yellow.500">DPlayer</Link></ListItem>
      </UnorderedList>

      <Text mt="2" fontSize="xl" fontWeight="medium">BGmi Creator - <Link href="https://github.com/RicterZ" color="red.300">RicterZ</Link></Text>
      <Text fontSize="xl" fontWeight="medium">BGmi Contributors - <Link href="https://github.com/BGmi/BGmi/graphs/contributors" color="red.300">Contributors</Link></Text>

      <Box mt="4">
        <Heading>Bug Report</Heading>
        <UnorderedList mt="2">
          <ListItem>
            <Link href="https://github.com/BGmi/BGmi/issues" color={colorMode === 'dark' ? 'purple.100' : 'purple.400'}>
              BGmi Bug Report
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://github.com/BGmi/BGmi-frontend/issues" color={colorMode === 'dark' ? 'purple.100' : 'purple.400'}>
              BGmi-frontend Bug Report
            </Link>
          </ListItem>
        </UnorderedList>
      </Box>
    </>
  );
}

About.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
