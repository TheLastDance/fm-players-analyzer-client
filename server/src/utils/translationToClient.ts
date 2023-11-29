import { Attributes } from "../types";
import { attributesFull } from "../data/attributes";

// this function will translate players attributes keys to selected language
// If this function will affect server perfomance in future it will go to a frontend side
function translationToClient(playerAttributes: Attributes, lang: keyof typeof attributesFull = 'en') {
  const entries = Object.entries(playerAttributes) as [keyof Attributes, number][];
  const swapLang = entries.map(([key, value]) => [[attributesFull[lang][key]], value]);
  return Object.fromEntries(swapLang);
}

export default translationToClient;