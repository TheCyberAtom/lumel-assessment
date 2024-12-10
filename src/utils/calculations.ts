export const calculateVariance = (
  current: number,
  original: number
): number => {
  if (original === 0) return 0;
  return Number((((current - original) / original) * 100).toFixed(2));
};

export const calculateSubtotal = (row: any): number => {
  if (!row.children) return row.value;
  return row.children.reduce((sum: number, child: any) => sum + child.value, 0);
};

export const distributeValueToChildren = (row: any, newValue: number): void => {
  if (!row.children || row.children.length === 0) return;

  const currentTotal = calculateSubtotal(row);
  row.children.forEach((child: any) => {
    const contribution = child.value / currentTotal;
    child.value = Number((newValue * contribution).toFixed(4));
  });
};
