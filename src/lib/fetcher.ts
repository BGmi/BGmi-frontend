export const fetcher = async <T>([key, authToken]: [string, string?], options: ResponseInit): Promise<T> => {
  const headers = new Headers();
  if (authToken) headers.append('bgmi-token', authToken);

  // request timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 10000);

  const res = await fetch(`.${key}`, { signal: controller.signal, headers, ...options });

  if (!res.ok) throw new Error(`fetcher error ${res.status}`);

  clearTimeout(timeoutId);
  return res.json();
};

export const fetcherWithMutation = async <T>(
  [key, authToken]: [string, string?],
  { arg }: { arg: Record<string, any> }
): Promise<T> => {
  const headers = new Headers();
  if (authToken) headers.append('bgmi-token', authToken);

  const options: RequestInit = {
    headers,
    method: 'POST',
    body: JSON.stringify(arg),
  };

  // request timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 15000);

  const res = await fetch(`.${key}`, { signal: controller.signal, ...options });

  if (!res.ok) throw new Error(`fetcher error ${res.status}`);

  clearTimeout(timeoutId);
  return res.json();
};
