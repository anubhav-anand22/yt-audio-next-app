let id: NodeJS.Timeout | null;

export const delayedInput = (cb: any, time: number = 150, args: any[]) => {
  if (id) clearTimeout(id);

  id = setTimeout(() => {
    id = null;
    cb(...args);
  }, time);
};
