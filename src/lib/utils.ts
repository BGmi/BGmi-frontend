export const isBrowser = typeof window !== 'undefined';

export const handleSecondaryTitle = (title: string) => {
  if (title === '/') return;

  if (title.includes('/player/')) return 'Player';

  return `${title[1].toUpperCase()}${title.slice(2)}`;
};

export const normalizePath = (url: string) => {
  return encodeURIComponent(url);
};

export const createAbsoluteUrl = (url: string) => {
  const link = document.createElement('a');
  link.href = url;

  const absoluteUrl = link.href;
  link.remove();

  return absoluteUrl;
};
