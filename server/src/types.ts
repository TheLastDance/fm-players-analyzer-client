export type Attribute = {
  [innerKey: string]: number;
};

export type RowData = {
  attributes: Attribute;
  skills: {
    ST: number,
    CD: number,
  }
} & {
  [key: string]: string | number;
};

export type ForTiers = {
  [key: string]: number;
}

export type Tiers = {
  tier_1: ForTiers;
  tier_2: ForTiers;
  tier_3: ForTiers;
  tier_4?: ForTiers;
}

export type IPositions = {
  ST: Tiers,
  CD: Tiers,
} & {
  [key: string]: Tiers;
};

export type MergedTiers = {
  [key: string]: {
    [key: string]: number;
  }
};

export interface ICalculateCoef {
  keysOfPositions: string[],
  mergedObj: MergedTiers[],
  coef: number[]
} 