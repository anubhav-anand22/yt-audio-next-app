export const parseBytes = (num: number) => {
  let output = 0,
    suffix = "b";

  if (num < 1024) {
    output = num;
  } else if (num < 1048576) {
    output = num / 1024;
    suffix = "kb";
  } else if (num < 1073741824) {
    output = num / 1048576;
    suffix = "mb";
  } else {
    output = num / 1073741824;
    suffix = "gb";
  }

  const outputArr = output.toString().split(".");

  return (
    outputArr[0] + (outputArr[1] && "." + outputArr[1]?.slice(0, 1)) + suffix
  );
};
