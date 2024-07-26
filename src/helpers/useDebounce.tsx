import { useRef, useCallback } from "react";

type DebounceCallback = (...args: any[]) => void;

const useDebounce = (callback: DebounceCallback, delay: number) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
};

export default useDebounce;
