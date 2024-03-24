import { MutableRefObject, useCallback, useRef } from "react";

export const useDebounce = (cb: (...args: unknown[]) => void, time?: number): [
    (...args: unknown[]) => void,
    MutableRefObject<ReturnType<typeof setTimeout> | undefined>
] => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

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
