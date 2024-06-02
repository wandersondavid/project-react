import { useEffect, useState } from "react";
import api from "../services/api";
import { ReportPhysicalPersonType } from "../types/report-physical-person";

export type LoadingType =
  | "loading"
  | "success"
  | "error"
  | "submitting"
  | "error-fetching";

export type useReportPhysicalPersonType = {
  loading: LoadingType;
  data: ReportPhysicalPersonType[];
  dowloadReportPhysicalPerson: (id: string) => void;
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

  const dowloadReportPhysicalPerson = async (id: string) => {
    try {
      const response = await api.get(`/report/physical-person/${id}/download`);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report-physical-person.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {}
  };

  useEffect(() => {
    fetchReportPhysicalPerson();
  }, []);

  return {
    loading,
    data,
    dowloadReportPhysicalPerson,
  };
};
