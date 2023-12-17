export const isMaskedByHalf = (val: string) => val ? val.match(/^(\d+)-(\d+)$/) : false;

export function maskSkillHandling(val: string): number {
  const match = isMaskedByHalf(val);
  return Number(val) ? Number(val) : match ? (Number(match[2]) + Number(match[1])) / 2 : 10;
}