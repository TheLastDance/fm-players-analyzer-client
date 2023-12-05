import { titles } from "../data/positionsTitles";

export const handleTitles = (item: keyof typeof titles, position: any = {}) => {
  if (Object.prototype.hasOwnProperty.call(titles, item)) {
    return titles[item];
  }
  if (Object.prototype.hasOwnProperty.call(position, item)) {
    return item;
  }
  return "";
}