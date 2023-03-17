import { BASE_PATH } from './contant';

export const fetcher = async <T>([key, authToken]: [string, string?], options: ResponseInit): Promise<T> => {
  const headers = new Headers();
  if (authToken)
    headers.append('bgmi-token', authToken);

  const res = await fetch(BASE_PATH + key, { headers, ...options });

  if (!res.ok)
    throw new Error(`fetcher error ${res.status}`);

  return res.json();
};
