export const fetcher = async <T>([key, authToken]: [string, string?], options: ResponseInit): Promise<T> => {
  const headers = new Headers();
  if (authToken) headers.append('Authorization', `Bearer ${authToken}`);

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
  headers.append('Content-Type', 'application/json');
  if (authToken) headers.append('Authorization', `Bearer ${authToken}`);

  const isRequestOptions = 'method' in arg || 'path' in arg || 'body' in arg;
  const requestArg = isRequestOptions
    ? (arg as {
        method?: string;
        path?: string;
        body?: Record<string, any>;
      })
    : undefined;
  const body = requestArg ? requestArg.body : arg;

  const options: RequestInit = {
    headers,
    method: requestArg?.method ?? 'POST',
    body: body ? JSON.stringify(body) : undefined,
  };

  // request timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 15000);

  const res = await fetch(`.${key}${requestArg?.path ?? ''}`, { signal: controller.signal, ...options });

  if (!res.ok) throw new Error(`fetcher error ${res.status}`);

  clearTimeout(timeoutId);
  return res.json();
};
