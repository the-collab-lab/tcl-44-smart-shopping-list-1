let globalList = [];

export const getGlobalList = () => {
  return globalList;
};

export const setGlobalList = (existingItemsList) => {
  globalList = [...existingItemsList];
};
