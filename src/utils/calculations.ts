export const calculateVariance = (
  current: number,
  original: number
): number => {
  if (original === 0) return 0;
  return Number((((current - original) / original) * 100).toFixed(2));
};
