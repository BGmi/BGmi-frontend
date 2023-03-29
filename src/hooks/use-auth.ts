import { hasCookie } from 'cookies-next';

export const useAuth = () => {
  const tryAuth = async (authToken: string) => {
    // request timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 3000);

    const options: RequestInit = {
      signal: controller.signal,
      method: 'POST',
      body: JSON.stringify({ token: authToken })
    };

    return { timeoutId, response: await fetch('./api/auth', options) };
  };

  return {
    tryAuth,
    hasAuth: hasCookie('authToken')
  };
};
