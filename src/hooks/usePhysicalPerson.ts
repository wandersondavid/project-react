import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import api from "../services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchCepData } from "../services/viacep/viacep.service";
import { PhysicalPersonType } from "../types/physical-person";

const validationPhysicalPersonSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().min(1, "Cpf é obrigatório"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  addresses: z.object({
    id: z.string().optional(),
    number: z.string().min(1, "Número é obrigatório"),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, "Bairro é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatório"),
    state: z.string().min(1, "Estado é obrigatório"),
    zip_code: z.string().min(1, "Cep é obrigatório"),
  }),
});

export type ValidationPhysicalPerson = z.infer<
  typeof validationPhysicalPersonSchema
> & {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  addresses: {
    id: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
    physical_person_id: string;
  };
};

type LoadingType = "loading" | "success" | "error" | "submitting";

export type usePhysicalPersonType = {
  form: UseFormReturn<ValidationPhysicalPerson, any, undefined>;
  onSubmit: () => void;
  loading: LoadingType;
  fetchAddress: () => void;
  data: PhysicalPersonType[];
  deletePhysicalPerson: (id: string) => void;
  fetchPhysicalPersonById: (id: string) => void;
};

export const usePhysicalPerson = (): usePhysicalPersonType => {
  const [loading, setLoading] = useState<LoadingType>("loading");
  const [data, setData] = useState<PhysicalPersonType[]>([]);

  const form = useForm<ValidationPhysicalPerson>({
    resolver: zodResolver(validationPhysicalPersonSchema),
  });

  const postPhysicalPerson = async (data: ValidationPhysicalPerson) => {
    try {
      setLoading("submitting");

      const response = await api.post("/physical-person", data);

      setLoading("success");

      return response.data;
    } catch (error) {
      setLoading("error");
    }
  };

  const updatePhysicalPerson = async (data: ValidationPhysicalPerson) => {
    try {
      setLoading("submitting");

      const response = await api.put(`/physical-person/${data.id}`, data);

      setLoading("success");

      return response.data;
    } catch (error) {
      setLoading("error");
    }
  };

  const deletePhysicalPerson = async (id: string) => {
    try {
      setLoading("submitting");
      await api.delete(`/physical-person/${id}`);
      setLoading("success");
    } catch (error) {
      setLoading("error");
    }
  };

  const fetchPhysicalPerson = async () => {
    try {
      const response = await api.get("/physical-person");

      setData(response.data);
    } catch (error) {
      setLoading("error");
    }
  };

  const fetchPhysicalPersonById = async (id: string) => {
    try {
      const response = await api.get(`/physical-person/${id}`);

      const dataResponse = {
        ...response.data,
        addresses: response.data.addresses[0],
      };

      form.reset(dataResponse);
    } catch (error) {
      setLoading("error");
    }
  };

  const fetchAddress = async () => {
    try {
      const zipCode = form.getValues("addresses.zip_code");

      if (!zipCode) {
        return;
      }

      const address = await fetchCepData({ zipCode });

      form.setValue("addresses.city", address.localidade);
      form.setValue("addresses.state", address.uf);
      form.setValue("addresses.neighborhood", address.bairro);
      form.setValue("addresses.complement", address.complemento);
      form.setValue("addresses.number", "");
    } catch (error) {
      console.log("error fetch address ", error);
    }
  };

  useEffect(() => {
    fetchPhysicalPerson();
  }, []);

  const onSubmit = form.handleSubmit((data) => {
    if (data.id) {
      updatePhysicalPerson(data);
    }

    postPhysicalPerson(data);
  });

  return {
    form,
    onSubmit,
    loading,
    fetchAddress,
    data,
    deletePhysicalPerson,
    fetchPhysicalPersonById,
  };
};
