import { ITemplateOne, TiersEnum } from "../types";
import { coefficients } from "../data/coefficients";

export const templateArraytoServerObj = (dataFromStorage: string | null) => {

  if (dataFromStorage) {
    const templateParsed: ITemplateOne[] = JSON.parse(dataFromStorage);
    const obj: Record<string, never> | any = {};

    for (const item of templateParsed) {
      const { name } = item;
      const filtered = item.templates.filter(item => item.name !== TiersEnum.noTier);
      const changed = filtered.map((item) => ({
        [item.name]: Object.fromEntries([...item.attributes.map((el) => ([el, coefficients[item.name as TiersEnum.tier_1]]))])
      }));

      const [tier_1, tier_2, tier_3, tier_4] = changed;

      obj[`#${name}`] = {
        ...tier_1,
        ...tier_2,
        ...tier_3,
        ...tier_4,
      };
    }

    return JSON.stringify(obj);
  }

  return JSON.stringify({});
}