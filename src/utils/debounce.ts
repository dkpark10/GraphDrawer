type CallBack = (...rest: any[]) => void;

export const debounce = (callback: CallBack, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...rest: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(rest);
    }, delay);
  }
}