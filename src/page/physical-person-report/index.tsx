import { useReportPhysicalPerson } from "../../hooks/useReportPhysicalPerson";
import { PageContainer } from "../../components/page-container";
import { SkeletonPage } from "./components/skeleton-page";
import {
  Typography,
  Box,
  Grid,
  List,
  ListItemText,
  ListItem,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import { Download } from "lucide-react";
import { fotmatDate } from "../../utils/format-date";

const ContainerList = styled(List)`
  width: 100%;
`;
export const PhysicalRersonReport = () => {
  const { data, loading } = useReportPhysicalPerson();
  return (
    <PageContainer title="List Relatório de Pessoa Física">
      <Box display="flex">
        {loading === "loading" && <SkeletonPage />}
        {loading === "success" && !!data.length && (
          <ContainerList dense={false}>
            {data.map((item, index) => (
              <>
                <ListItem>
                  <ListItemText
                    primary={"Relatório de Pessoa Física (CSV)"}
                    secondary={`Status: ${item.status} - Data: ${fotmatDate(item.created_at)}`}
                  />
                  <Download cursor={"pointer"} />
                </ListItem>
                {index !== data.length - 1 && <Divider component="li" />}
              </>
            ))}
          </ContainerList>
        )}

        {loading === "success" && !data.length && (
          <Box>
            <Typography fontSize="16px">
              Nenhum dado encontrado para ser exibido
            </Typography>
          </Box>
        )}
      </Box>
    </PageContainer>
  );
};
