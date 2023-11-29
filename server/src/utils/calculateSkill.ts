import { Attributes } from "../types";
import { ICalculateCoef, ForTiers } from "../types";

function calculateSkill(positions: ICalculateCoef, playersAttributes: Attributes) {
  const { mergedObj, coef, keysOfPositions } = positions;
  let skills: ForTiers = {};
  let counter = 0;

  for (let i = 0; i < mergedObj.length; i++) {
    const pos = mergedObj[i][keysOfPositions[i]]; // merged object of stats coefficients
    const posArr = Object.keys(pos); // array of stats coefficients keys
    let count = 0;

    for (let j = 0; j < posArr.length; j++) {
      const key = posArr[j] as keyof Attributes;
      count = pos[key] * playersAttributes[key] + count; // sums attribute multiplied by its coefficient
      counter++
    }

    skills[keysOfPositions[i]] = (count / coef[i]) * 5.5;
  }
  //console.log(counter);


  return skills;
}

export default calculateSkill;


