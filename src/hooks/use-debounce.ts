import { useState, useEffect } from 'react';

interface DebounceParam<T> {
  value: T;
  delay: number;
}

export const useDebounce = <T>({ value, delay }: DebounceParam<T>) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
