export enum TiersEnum {
  noTier = "no_tier",
  tier_1 = "tier_1",
  tier_2 = "tier_2",
  tier_3 = "tier_3",
  tier_4 = "tier_4"
}

export type Attribute = {
  [innerKey: string]: number;
}

export type RowData = {
  attributes: Attribute;
  skills: {
    ST: number,
    CD: number,
    GK: number,
    CM: number,
    WA: number,
    DM: number,
    AM: number,
    WM: number,
    FB: number,
    WB: number,
    [key: string]: number;
  }
} & {
  [key: string]: number;
}

export type Language = {
  lang: 'en' | 'ru',
  img: string,
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

export interface ITemplateArray {
  name: "tier_1" | "tier_2" | "tier_3" | "tier_4" | "no_tier",
  attributes: string[],
}

export interface ITemplateOne {
  name: string,
  toggled: boolean,
  id: string,
  templates: ITemplateArray[],
}

export interface ITemplateArrayForServer {
  [TiersEnum.tier_1]: [string, number],
  [TiersEnum.tier_2]: [string, number],
  [TiersEnum.tier_3]: [string, number],
  [TiersEnum.tier_4]: [string, number],
}