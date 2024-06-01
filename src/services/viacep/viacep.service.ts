import { apiViaCep } from "../api-viacep";
import { ViaCepResponse } from "./viacep.types";

export const fetchCepData = async ({
  zipCode,
}: {
  zipCode: string;
}): Promise<ViaCepResponse> => {
    const response = await apiViaCep.get(`/ws/${zipCode}/json`, {});
    return response.data;
};
