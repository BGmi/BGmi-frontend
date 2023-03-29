import { Button, Card, CardBody, CardHeader, Heading, Input, InputGroup, InputLeftAddon, Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react';

import { useState } from 'react';
import { setCookie } from 'cookies-next';

import { BsChevronDown } from 'react-icons/bs';

import { useAuth } from '~/hooks/use-auth';
import { useNavigate } from 'react-router-dom';

export default function Auth({ children, to }: { children: React.ReactElement, to: string }) {
  const [authToken, setAuthToken] = useState('');
  const toast = useToast();
  const { tryAuth, hasAuth } = useAuth();

  const navigate = useNavigate();

  if (hasAuth)
    return children;

  const handleAuth = async (date: number) => {
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
      const { timeoutId, response } = await tryAuth(authToken);
      if (!response.ok)
        throw await response.json();

      clearTimeout(timeoutId);
      toast({
        title: '验证成功',
        status: 'success',
        duration: 2000,
        position: 'top-right'
      });

      setCookie('authToken', authToken, {
        expires: date > 0 ? new Date(Date.now() + (date * 1000)) : undefined
      });

      navigate(to);
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
          <InputLeftAddon pointerEvents="none">
            TOKEN
          </InputLeftAddon>
          <Input onChange={e => setAuthToken(e.currentTarget.value)} type="password" placeholder="..." />
          <Menu autoSelect={false}>
            <MenuButton as={Button} ml="2" minW="24" rightIcon={<BsChevronDown size="12" />}>验证</MenuButton>
            <MenuList minW="12" onClick={e => handleAuth(+(e.target as HTMLButtonElement).value)}>
              <MenuItem value="0">不记住</MenuItem>
              <MenuItem value="131557600">记住一年</MenuItem>
              <MenuItem value="2629800">记住一个月</MenuItem>
              <MenuItem value="86400">记住一天</MenuItem>
              <MenuItem value="3600">记住一小时</MenuItem>
            </MenuList>
          </Menu>
        </InputGroup>
      </CardBody>
    </Card>
  );
}
