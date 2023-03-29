type CallBack = (...rest: unknown[]) => void;

export const debounce = (callback: CallBack, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...rest: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(rest);
    }, delay);
  }
}