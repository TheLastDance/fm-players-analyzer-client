import { IPositions, ICalculateCoef, MergedTiers } from "../types";

function calculateCoef(position: IPositions): ICalculateCoef {
  const keysArray = Object.keys(position);

  const mergedObj: ICalculateCoef['mergedObj'] = keysArray.map((item: string) => ({
    [item]: ({
      ...position[item]['tier_1'],
      ...position[item]['tier_2'],
      ...position[item]['tier_3'],
      ...position[item]['tier_4']
    })
  }));

  const coef: number[] = mergedObj.map((item: MergedTiers) => {
    const key = Object.keys(item)[0];

    return Object.values(item[key]).reduce((acc: number, item: number) => acc + item, 0);
  });

  return {
    keysOfPositions: keysArray, // array of positions namings
    mergedObj: mergedObj, // array object of merged attributes in tiers
    coef: coef // calculated coefficient of merged object
  }

}

export default calculateCoef;