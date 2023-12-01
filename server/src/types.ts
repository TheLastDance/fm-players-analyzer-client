export type Attribute = {
  [innerKey: string]: number;
};

export type RowData = {
  attributes: Attributes;
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
  tier_4: ForTiers;
}

export type IPositions = {
  ST: Tiers,
  CD: Tiers,
  GK: Tiers,
  CM: Tiers,
  WA: Tiers,
  DM: Tiers,
  AM: Tiers,
  WM: Tiers,
  FB: Tiers,
  WB: Tiers,
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

export interface ITranslationPairs {
  "Agg": string,
  "Ecc": string,
  "Fre": string,
  "Bra": string,
  "Acc": string,
  "Aer": string,
  "Cor": string,
  "Tec": string,
  "Pac": string,
  "Str": string,
  "Cmp": string,
  "Det": string,
  "Ref": string,
  "Wor": string,
  "Nat": string,
  "Dec": string,
  "Fir": string,
  "Pen": string,
  "Pas": string,
  "Tck": string,
  "Pun": string,
  "Mar": string,
  "1v1": string,
  "Cro": string,
  "Agi": string,
  "Ldr": string,
  "Bal": string,
  "Cnt": string,
  "Tea": string,
  "Ant": string,
  "Fla": string,
  "Han": string,
  "TRO": string,
  "Hea": string,
  "Cmd": string,
  "OtB": string,
  "Fin": string,
  "Dri": string,
  "Lon": string,
  "Jum": string,
  "Sta": string,
  "Pos": string,
  "Kic": string,
  "Vis": string,
  "Com": string,
  "Thr": string,
  "L Th": string,
}

export type Attributes = {
  "Agg": number,
  "Ecc": number,
  "Fre": number,
  "Bra": number,
  "Acc": number,
  "Aer": number,
  "Cor": number,
  "Tec": number,
  "Pac": number,
  "Str": number,
  "Cmp": number,
  "Det": number,
  "Ref": number,
  "Wor": number,
  "Nat": number,
  "Dec": number,
  "Fir": number,
  "Pen": number,
  "Pas": number,
  "Tck": number,
  "Pun": number,
  "Mar": number,
  "1v1": number,
  "Cro": number,
  "Agi": number,
  "Ldr": number,
  "Bal": number,
  "Cnt": number,
  "Tea": number,
  "Ant": number,
  "Fla": number,
  "Han": number,
  "TRO": number,
  "Hea": number,
  "Cmd": number,
  "OtB": number,
  "Fin": number,
  "Dri": number,
  "Lon": number,
  "Jum": number,
  "Sta": number,
  "Pos": number,
  "Kic": number,
  "Vis": number,
  "Com": number,
  "Thr": number,
  "L Th": number,
}
