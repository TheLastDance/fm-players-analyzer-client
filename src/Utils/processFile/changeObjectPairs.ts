import { TranslationPairs } from "../../types";

// Mainly used for translation purposes to swap key-value pairs in object
function changeObjectPairs(obj: TranslationPairs) {
  const entries = Object.entries(obj) as [keyof TranslationPairs, string][];
  const swapped = entries.map(([key, value]) => [value, key]);

  return Object.fromEntries(swapped);
}

export default changeObjectPairs;