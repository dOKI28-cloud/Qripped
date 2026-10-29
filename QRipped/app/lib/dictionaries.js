

const dictionaries = {
  sq: () => import("../../dictionaries/sq.json").then((module) => module.default),
  en: () => import("../../dictionaries/en.json").then((module) => module.default),
  tr: () => import("../../dictionaries/tr.json").then((module) => module.default),
};

export const getDictionary = async (locale) => {
  if (typeof dictionaries[locale] === "function") {
    return dictionaries[locale]();
  }
  return dictionaries.en(); // Kthen anglishten si bazë nëse gjuha nuk ekziston
};