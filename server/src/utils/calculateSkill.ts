import { RowData } from "../types";
import { ICalculateCoef, ForTiers } from "../types";

function calculateSkill(positions: ICalculateCoef, playersAttributes: RowData['attributes']) {
  const { mergedObj, coef, keysOfPositions } = positions;
  let skills: ForTiers = {};
  let counter = 0;

  for (let i = 0; i < mergedObj.length; i++) {
    const pos = mergedObj[i][keysOfPositions[i]]; // merged object of stats coefficients
    const posArr = Object.keys(pos); // aray of stats coefficients keys
    let count = 0;

    for (let j = 0; j < posArr.length; j++) {
      count = pos[posArr[j]] * playersAttributes[posArr[j]] + count; // sums attribute multiplied by its coefficient
      counter++
    }

    skills[keysOfPositions[i]] = (count / coef[i]) * 5.5;
  }
  console.log(counter);


  return skills;
}

// function calculateSkill(positions: ICalculateCoef, players: RowData[]) {
//   const { mergedObj, coef, keysOfPositions } = positions;
//   const attributes = players.map(item => ({ ...item.attributes }));
//   let skills: ForTiers = {};
//   let skillsArray: ForTiers[] = [];

//   for (let i = 0; i < attributes.length; i++) {
//     const pos = mergedObj[i][keysOfPositions[i]]; // merged object of stats coefficients
//     const posArr = Object.keys(pos); // aray of stats coefficients keys
//     let count = 0;

//     //if (attributes[i][])

//     for (let j = 0; j < posArr.length; j++) {
//       count = pos[posArr[j]] * (attributes[i][posArr[j]]) + count; // sums attribute multiplied by its coefficient
//     }

//     skills[keysOfPositions[i]] = (count / coef[i]) * 5.5;
//     skillsArray.push(skills);
//     skills = {};
//   }
//   console.log(skillsArray);

//   return skillsArray;
// }

// function calculateSkill(data: ICalculateCoef, playersAttributes: RowData['attributes'], pos: string) {
//   const { mergedObj, coef, keysOfPositions } = data;

//   const position = mergedObj.filter((item: any) => item[pos])[0][pos]; // merged object of stats coefficients

//   //console.log(position);


//   const posArr = Object.keys(position); // aray of stats coefficients keys
//   let count = 0;
//   for (let j = 0; j < posArr.length; j++) {
//     count = position[posArr[j]] * playersAttributes[posArr[j]] + count;
//   }
//   return (count / coef[0]) * 5.5;

// }

export default calculateSkill;


