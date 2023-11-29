import { ITranslationPairs } from "../types";

// Mainly used for translation purposes to swap key-value pairs in object
function changeObjectPairs(obj: ITranslationPairs) {
  const entries = Object.entries(obj) as [keyof ITranslationPairs, string][];
  const swapped = entries.map(([key, value]) => [value, key]);

  return Object.fromEntries(swapped);
}

export default changeObjectPairs;