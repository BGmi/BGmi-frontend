export const fetcher = async <T>(key: string): Promise<T> => {
  const res = await fetch(key);

  if (!res.ok)
    throw new Error('get bangumi error');

  return res.json();
};
