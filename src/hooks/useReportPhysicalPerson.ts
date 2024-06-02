import { useEffect, useState } from "react";
import api from "../services/api";
import { ReportPhysicalPersonType } from "@/types/report-physical-person";

export type LoadingType =
  | "loading"
  | "success"
  | "error"
  | "submitting"
  | "error-fetching";

export type useReportPhysicalPersonType = {
  loading: LoadingType;
  data: ReportPhysicalPersonType[];
};

export const useReportPhysicalPerson = (): useReportPhysicalPersonType => {
  const [loading, setLoading] = useState<LoadingType>("loading");
  const [data, setData] = useState<ReportPhysicalPersonType[]>([]);

  const fetchReportPhysicalPerson = async () => {
    try {
      const response = await api.get("/report/physical-person");

      setData(response.data);
      setLoading("success");
    } catch (error) {
      setLoading("error-fetching");
    }
  };

  useEffect(() => {
    fetchReportPhysicalPerson();
  }, []);

  return {
    loading,
    data,
  };
};
