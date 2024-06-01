import { apiViaCep } from "../api-viacep";
import { ViaCepResponse } from "./viacep.types";

const fetchCepData = async ({
  cep,
}: {
  cep: string;
}): Promise<ViaCepResponse> => {
  try {
    const response = await apiViaCep.get(`/ws/${cep}/json`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ViaCepService = {
  fetchCepData,
};
