import { apiViaCep } from "../api-viacep";
import { ViaCepResponse } from "./viacep.types";

export const fetchCepData = async ({
  zipCode,
}: {
  zipCode: string;
}): Promise<ViaCepResponse> => {
    const response = await apiViaCep.get(`/ws/${zipCode}/json`, {});
    if (response.data.erro) {
      throw new Error("CEP não encontrado");
    }

    return response.data;
};
