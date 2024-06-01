
export const formatPhone = (telefone: string) => {
    if (!telefone) return "";
    return telefone.length === 11
        ? telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
        : telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
};