export type Attribute = {
  [innerKey: string]: number;
}

export type RowData = {
  attributes: Attribute;
  skills: {
    ST: number,
    CD: number,
    [key: string]: number;
  }
} & {
  [key: string]: string | number;
}

export type Language = {
  lang: 'en' | 'ru',
  img: string,
}