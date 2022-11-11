export const formatTime = (time: number) => {
  const t = new Date(time);
  return `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()} ${t.getDate()}-${
    t.getMonth() + 1
  }-${t.getFullYear()}`;
};
