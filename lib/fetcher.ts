export const fetcher = async <T>(...args: [RequestInfo, RequestInit]): Promise<T> => {
  const res = await fetch(...args);

  if (!res.ok)
    throw new Error(`fetcher error ${res.status}`);

  return res.json();
};
