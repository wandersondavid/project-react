export const formatZipCode = (zipCode: string) => {
  if (!zipCode) return "";
  return zipCode.replace(/(\d{5})(\d{3})/, "$1-$2");
};
