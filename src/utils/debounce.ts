// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CallBack = (...rest: any[]) => void;

export const debounce = (callback: CallBack, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...rest: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(rest);
    }, delay);
  };
};
