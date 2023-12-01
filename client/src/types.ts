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