import { BASE_PATH } from './contant';

export const fetcher = async <T>([key, authToken]: [string, string?], options: ResponseInit): Promise<T> => {
  const headers = new Headers();
  if (authToken)
    headers.append('bgmi-token', authToken);

  // request timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 5000);

  const res = await fetch(BASE_PATH + key, { signal: controller.signal, headers, ...options });

  if (!res.ok)
    throw new Error(`fetcher error ${res.status}`);

  clearTimeout(timeoutId);
  return res.json();
};
