
export const formatPhone = (telefone: string) => {
    if (!telefone) return "";
    return telefone.length === 11
        ? telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
        : telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
};


export const formatPhoneInput= (value: string) => {
    const cleanedValue = value.replace(/\D/g, '')

    const maxLength = 11
    let truncatedValue = cleanedValue.slice(0, maxLength)

    if (truncatedValue.length === 0) {
      return ''
    }

    if (truncatedValue.length <= 2) {
      console.log(truncatedValue)
      return truncatedValue.replace(/(\d{0,2})/, '($1')
    }

    if (truncatedValue.length <= 7) {
      return truncatedValue.replace(/(\d{2})(\d{0,5})/, '($1) $2')
    }

    if (truncatedValue.length <= 11) {
      return truncatedValue.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
    }

    return truncatedValue
  }