import { Box, Button, Card, CardBody, CardHeader, Heading, Input, InputGroup, InputLeftElement, Radio, RadioGroup, Stack, useToast } from '@chakra-ui/react';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { setCookie } from 'cookies-next';

import { BsQuestionSquareFill } from 'react-icons/bs';

import { useAuth } from '~/hooks/use-auth';

export default function Auth() {
  const [authToken, setAuthToken] = useState('');
  const [date, setDate] = useState('131557600');

  const toast = useToast();
  const { tryAuth } = useAuth();

  const router = useRouter();

  const handleAuth = async () => {
    if (authToken === '') {
      toast({
        title: '请输入 Token！',
        status: 'warning',
        duration: 2000,
        position: 'top-right'
      });
      return;
    }

    try {
      const res = await tryAuth(authToken);
      if (!res.ok)
        throw await res.json();

      toast({
        title: '验证成功',
        status: 'success',
        duration: 2000,
        position: 'top-right'
      });

      setCookie('authToken', authToken, {
        expires: +date > 0 ? new Date(Date.now() + (+date * 1000)) : undefined
      });

      router.push(router.asPath);
    } catch (error) {
      const authError = error as { status: string; message: string };
      console.error(authError);
      toast({
        title: `验证失败: ${authError.message}`,
        status: 'error',
        duration: 2000,
        position: 'top-right'
      });
    }
  };

  return (
    <Card display="flex" justifyContent="center" mt="20" mx="auto" maxW="xl">
      <CardHeader>
        <Heading>验证 Token</Heading>
      </CardHeader>
      <CardBody>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <BsQuestionSquareFill />
          </InputLeftElement>
          <Input onChange={e => setAuthToken(e.currentTarget.value)} type="password" placeholder="input token..." />
          <Button onClick={handleAuth} ml="2">验证</Button>
        </InputGroup>
        <Box>
          <RadioGroup onChange={setDate} value={date} mt="4">
            <Stack direction="row" spacing="5">
              <Radio value="0">不记住</Radio>
              <Radio value="131557600">一年</Radio>
              <Radio value="2629800">一个月</Radio>
              <Radio value="86400">一天</Radio>
              <Radio value="3600">一小时</Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </CardBody>
    </Card>
  );
}
