export const skillsQualityStyle = (item: string | number) =>
  typeof item == 'number' && item >= 80 ? "skill_green"
    : typeof item == 'number' && item >= 65 && item < 80 ? "skill_yellow"
      : typeof item == 'number' && item < 65 ? "skill_red" : "";

export function check<T>(check: boolean, ret: T) {
  return check ? ret : null;
}

export function multipleCheck<T>(arr: T[]) {
  for (const item of arr) {
    const check = item;
    if (check) return check;
  }
}