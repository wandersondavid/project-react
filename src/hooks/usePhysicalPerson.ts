import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import api from "../services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchCepData } from "../services/viacep/viacep.service";
import { PhysicalPersonType } from "../types/physical-person";
import { removeSpecialCharacters } from "../utils/remove-special-characters";
import { StatusReport } from "../enuns/status-report";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

export type LoadingType =
  | "loading"
  | "success"
  | "error"
  | "submitting"
  | "error-fetching";

export type usePhysicalPersonType = {
  form: UseFormReturn<ValidationPhysicalPerson, any, undefined>;
  onSubmit: () => void;
  loading: LoadingType;
  fetchAddress: () => void;
  data: PhysicalPersonType[];
  deletePhysicalPerson: (id: string) => void;
  fetchPhysicalPersonById: (id: string) => void;
  open: boolean;
  handleOpenNewPerson: () => void;
  handleOpenEditPerson: (id: string) => void;
  fetchPhysicalPerson: () => void;
  requestReportPhysicalPerson: () => void;
  requestReport: boolean;
  to: () => void;
};

export const usePhysicalPerson = (): usePhysicalPersonType => {
  const [loading, setLoading] = useState<LoadingType>("loading");
  const [requestReport, setRequestReport] = useState<boolean>(false);
  const [data, setData] = useState<PhysicalPersonType[]>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const form = useForm<ValidationPhysicalPerson>({
    resolver: zodResolver(validationPhysicalPersonSchema),
  });

  const to = () => {
    navigate("/physical-person-report");
  };

  const resetForm = () => {
    form.reset({
      id: "",
      name: "",
      cpf: "",
      phone: "",
      addresses: {
        id: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        zip_code: "",
        physical_person_id: "",
      },
    });
  };

  const handleOpenNewPerson = () => {
    resetForm();
    setOpen((prev) => !prev);
  };

  const handleOpenEditPerson = (id: string) => {
    fetchPhysicalPersonById(id);
    setOpen((prev) => !prev);
  };

  const postPhysicalPerson = async (data: ValidationPhysicalPerson) => {
    try {
      setLoading("submitting");

      const payload = {
        ...data,
        cpf: removeSpecialCharacters(data.cpf),
        phone: removeSpecialCharacters(data.phone),
        addresses: [
          {
            ...data.addresses,
            zip_code: removeSpecialCharacters(data.addresses.zip_code),
          },
        ],
      };

      const response = await api.post("/physical-person", payload);

      setLoading("success");
      handleOpenNewPerson();
      fetchPhysicalPerson();
      resetForm();

      return response.data;
    } catch (error) {
      toast.error(
        "Erro ao cadastrar pessoa física, verifique os campos obrigatórios"
      );
    }
  };

  const updatePhysicalPerson = async (data: ValidationPhysicalPerson) => {
    try {
      setLoading("submitting");

      const payload = {
        ...data,
        cpf: removeSpecialCharacters(data.cpf),
        phone: removeSpecialCharacters(data.phone),
        addresses: [
          {
            ...data.addresses,
            zip_code: removeSpecialCharacters(data.addresses.zip_code),
          },
        ],
      };

      const response = await api.put(`/physical-person/${data.id}`, payload);

      setLoading("success");
      setOpen(false);
      fetchPhysicalPerson();
      resetForm();

      return response.data;
    } catch (error) {
      setLoading("error");
      toast.error("Erro ao atualizar pessoa física");
    }
  };

  const deletePhysicalPerson = async (id: string) => {
    try {
      setLoading("submitting");
      await api.delete(`/physical-person/${id}`);
      fetchPhysicalPerson();

      setLoading("success");
    } catch (error) {
      toast.error("Erro ao deletar pessoa física");
      setLoading("error");
    }
  };

  const fetchPhysicalPerson = async () => {
    try {
      const response = await api.get("/physical-person");

      setData(response.data);
      setLoading("success");
    } catch (error) {
      setLoading("error-fetching");
      toast.error("Erro ao buscar pessoas físicas");
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
      toast.error("Erro ao buscar pessoa física");
    }
  };

  const fetchAddress = async () => {
    try {
      form.clearErrors("addresses.zip_code");

      const zipCode = form.watch("addresses.zip_code");

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
      form.setError("addresses.zip_code", {
        type: "custom",
        message: "Cep inválido",
      });

      form.setValue("addresses.city", "");
      form.setValue("addresses.state", "");
      form.setValue("addresses.neighborhood", "");
      form.setValue("addresses.complement", "");
      form.setValue("addresses.number", "");
    }
  };

  const requestReportPhysicalPerson = async () => {
    try {
      setRequestReport(true);
      await api.post("/report/physical-person", {
        report: "physical-person",
        status: StatusReport.PENDING,
      });

      to();
    } catch (error) {
      setRequestReport(false);
      toast.error("Erro ao solicitar relatório de pessoa física");
    } finally {
      setRequestReport(false);
    }
  };

  useEffect(() => {
    fetchPhysicalPerson();
  }, []);

  const onSubmit = form.handleSubmit((data) => {
    if (data.id) {
      return updatePhysicalPerson(data);
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
    open,
    handleOpenNewPerson,
    handleOpenEditPerson,
    fetchPhysicalPerson,
    requestReportPhysicalPerson,
    requestReport,
    to,
  };
};
