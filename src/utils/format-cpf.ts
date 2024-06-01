export const formatCpf = (cpf: string) =>
  cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

export const formatCpfInput = (value: string) => {
  const cleanedValue = value.replace(/\D/g, "");

  const maxLength = 11;
  let truncatedValue = cleanedValue.slice(0, maxLength);

  if (truncatedValue.length === 0) {
    return "";
  }

  if (truncatedValue.length <= 3) {
    return truncatedValue.replace(/(\d{0,3})/, "$1");
  }

  if (truncatedValue.length <= 6) {
    return truncatedValue.replace(/(\d{3})(\d{0,3})/, "$1.$2");
  }

  if (truncatedValue.length <= 9) {
    return truncatedValue.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
  }

  if (truncatedValue.length <= 11) {
    return truncatedValue.replace(
      /(\d{3})(\d{3})(\d{3})(\d{0,2})/,
      "$1.$2.$3-$4"
    );
  }

  return truncatedValue;
};
