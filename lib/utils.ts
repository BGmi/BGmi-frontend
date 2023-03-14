export const isBrowser = typeof window !== 'undefined';

export const handleSecondaryTitle = (title: string) => {
  if (title === '/')
    return;

  return `${title[1].toUpperCase()}${title.slice(2)}`;
};

export const normalizePath = (url: string) => {
  return url.replace(/[:*?"<>|']/g, '');
};
