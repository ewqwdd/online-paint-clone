import { MutableRefObject, useCallback, useRef } from "react";

export const useDebounce = (cb: (...args: unknown[]) => void, time?: number): [
    (...args: unknown[]) => void,
    MutableRefObject<NodeJS.Timeout | undefined>
] => {
  const timerRef = useRef<NodeJS.Timeout>();

  const fn = useCallback(
    (...args: unknown[]) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => cb(...args), time ?? 300);
    },
    [cb, time]
  );
  return [fn, timerRef];
};
