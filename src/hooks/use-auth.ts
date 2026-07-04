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
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    return { timeoutId, response: await fetch('./api/admin/auth', options) };
  };

  return {
    tryAuth,
    hasAuth: hasCookie('authToken'),
  };
};
