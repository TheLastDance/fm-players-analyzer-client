import { titles } from "../data/positionsTitles";

export const handleTitles = (item: keyof typeof titles) => {
  if (Object.prototype.hasOwnProperty.call(titles, item)) {
    return titles[item];
  }
  return "";
}