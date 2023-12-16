export enum TiersEnum {
  noTier = "no_tier",
  tier_1 = "tier_1",
  tier_2 = "tier_2",
  tier_3 = "tier_3",
  tier_4 = "tier_4"
}

export enum PositionsEnum {
  Max = "Max",
  ST = "ST",
  CD = "CD",
  GK = "GK",
  CM = "CM",
  WA = "WA",
  DM = "DM",
  AM = "AM",
  WM = "WM",
  FB = "FB",
  WB = "WB",
}

export enum AttributesEnum {
  Agg = "Agg",
  Ecc = "Ecc",
  Fre = "Fre",
  Bra = "Bra",
  Acc = "Acc",
  Aer = "Aer",
  Cor = "Cor",
  Tec = "Tec",
  Pac = "Pac",
  Str = "Str",
  Cmp = "Cmp",
  Det = "Det",
  Ref = "Ref",
  Wor = "Wor",
  Nat = "Nat",
  Dec = "Dec",
  Fir = "Fir",
  Pen = "Pen",
  Pas = "Pas",
  Tck = "Tck",
  Pun = "Pun",
  Mar = "Mar",
  v_1 = "1v1",
  Cro = "Cro",
  Agi = "Agi",
  Ldr = "Ldr",
  Bal = "Bal",
  Cnt = "Cnt",
  Tea = "Tea",
  Ant = "Ant",
  Fla = "Fla",
  Han = "Han",
  TRO = "TRO",
  Hea = "Hea",
  Cmd = "Cmd",
  OtB = "OtB",
  Fin = "Fin",
  Dri = "Dri",
  Lon = "Lon",
  Jum = "Jum",
  Sta = "Sta",
  Pos = "Pos",
  Kic = "Kic",
  Vis = "Vis",
  Com = "Com",
  Thr = "Thr",
  L_Th = "L Th",
}

const { tier_1, tier_2, tier_3, tier_4 } = TiersEnum
const { ST, CD, GK, CM, WA, DM, AM, WM, FB, WB } = PositionsEnum

export type Attribute = {
  [innerKey: string]: number;
}

export type RowData = {
  attributes: TranslationPairs;
  skills: {
    [key in PositionsEnum]: number;
  } & {
    [key: string]: number;
  }
} & {
  [key: string]: string;
}

export type Language = {
  lang: 'en' | 'ru' | 'es',
  img: string,
}

export type TranslationPairs = {
  [key in AttributesEnum]: string;
}

export interface ITemplateArray {
  name: TiersEnum.tier_1 | TiersEnum.tier_2 | TiersEnum.tier_3 | TiersEnum.tier_4 | TiersEnum.noTier,
  attributes: string[],
}

export interface ITemplateOne {
  name: string,
  toggled: boolean,
  id: string,
  checked: boolean,
  templates: ITemplateArray[],
}

export interface ITemplateArrayForServer {
  [TiersEnum.tier_1]: [string, number],
  [TiersEnum.tier_2]: [string, number],
  [TiersEnum.tier_3]: [string, number],
  [TiersEnum.tier_4]: [string, number],
}

export type IPositions = {
  [key in PositionsEnum]: ITemplateArrayForServer;
} & {
  [key: string]: ITemplateArrayForServer;
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

export type ForTiers = {
  [key: string]: number;
}

export type Tiers = {
  [tier_1]: ForTiers;
  [tier_2]: ForTiers;
  [tier_3]: ForTiers;
  [tier_4]: ForTiers;
}

export type Positions = {
  [ST]: Tiers,
  [CD]: Tiers,
  [GK]: Tiers,
  [CM]: Tiers,
  [WA]: Tiers,
  [DM]: Tiers,
  [AM]: Tiers,
  [WM]: Tiers,
  [FB]: Tiers,
  [WB]: Tiers,
} & {
  [key: string]: Tiers;
};