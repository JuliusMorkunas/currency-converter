export const limitDecimals = (value, decimals = 2) => {
  return Number(value).toFixed(decimals);
};
