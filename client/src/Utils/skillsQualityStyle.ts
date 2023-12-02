export const skillsQualityStyle = (item: string | number) =>
  typeof item == 'number' && item >= 80 ? "skill_green"
    : typeof item == 'number' && item >= 65 && item < 80 ? "skill_yellow"
      : typeof item == 'number' && item < 65 ? "skill_red" : "";