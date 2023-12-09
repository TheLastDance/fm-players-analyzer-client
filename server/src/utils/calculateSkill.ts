import { Attributes } from "../types";
import { ICalculateCoef, ForTiers } from "../types";

const isMaskedByHalf = (val: string) => val.match(/^(\d+)-(\d+)$/);

function maskSkillHandling(val: string): number {
  const match = isMaskedByHalf(val);
  return Number(val) ? Number(val) : match ? (Number(match[2]) + Number(match[1])) / 2 : 10;
}

function calculateSkill(positions: ICalculateCoef, playersAttributes: Attributes) {
  const { mergedObj, coef, keysOfPositions } = positions;
  const multiplier = 5.5; // max skill in game equals to 20 so if we want overall skills as in fifa/pes we need to multiply our count to this variable.
  let skills: ForTiers = {};

  for (let i = 0; i < mergedObj.length; i++) {
    const pos = mergedObj[i][keysOfPositions[i]]; // merged object of stats coefficients
    const posArr = Object.keys(pos); // array of stats coefficients keys
    let count = 0;

    for (let j = 0; j < posArr.length; j++) {
      const key = posArr[j] as keyof Attributes;
      count = pos[key] * maskSkillHandling(playersAttributes[key]) + count; // sums attribute multiplied by its coefficient
    }

    skills[keysOfPositions[i]] = Number(((count / coef[i]) * multiplier).toFixed(2));
  }

  return skills;
}

export default calculateSkill;


