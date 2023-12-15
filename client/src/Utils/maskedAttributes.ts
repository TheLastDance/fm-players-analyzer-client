export const isMaskedByHalf = (val: string) => val.match(/^(\d+)-(\d+)$/);

export function maskSkillHandling(val: string): number {
  const match = isMaskedByHalf(val);
  return Number(val) ? Number(val) : match ? (Number(match[2]) + Number(match[1])) / 2 : 10;
}