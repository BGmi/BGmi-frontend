import { hasCookie } from 'cookies-next';
import { BASE_PATH } from '~/lib/contant';

export const useAuth = () => {
  const tryAuth = async (authToken: string) => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify({ token: authToken })
    };

    return await fetch(`${BASE_PATH}/api/auth`, options);
  };

  return {
    tryAuth,
    hasAuth: hasCookie('authToken')
  };
};
