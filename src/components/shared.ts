import { useState } from 'react';
export type BaseProps = { className?: string; id?: string };
export const cx = (...items: (string | false | null | undefined)[]) =>
  items.filter(Boolean).join(' ');
export function useControllable<T>(
  value: T | undefined,
  initial: T,
  onChange?: (value: T) => void,
) {
  const [internal, setInternal] = useState(initial);
  return [
    value === undefined ? internal : value,
    (next: T) => {
      if (value === undefined) setInternal(next);
      onChange?.(next);
    },
  ] as const;
}
