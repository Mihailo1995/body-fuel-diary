export const isPositiveNumber = (v: number | string) => {
  return typeof v === 'number' && v >= 0
}
