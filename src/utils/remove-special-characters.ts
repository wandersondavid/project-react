export const removeSpecialCharacters = (text: string) => {
  if (!text) return "";
  return text.replace(/[^A-Za-z0-9]/g, "");
};
