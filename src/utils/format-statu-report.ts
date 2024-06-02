import { StatusReport } from "../enuns/status-report";

export const fotmatStatusReport = (data: string) => {
  const status: Record<string, string> = {
    [StatusReport.PENDING]: "Processando",
    [StatusReport.DONE]: "Pronto",
    [StatusReport.ERROR]: "Erro",
  };

  return status[data] ?? "Processando";
};
