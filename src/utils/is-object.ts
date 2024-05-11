// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = (data: any): boolean => {
  return (typeof data === 'object' && data !== null) || Array.isArray(data);
};
