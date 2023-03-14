import { useEffect, useLayoutEffect } from 'react';
import { isBrowser } from '~/lib/utils';

export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
