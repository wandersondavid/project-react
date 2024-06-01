import { usePhysicalPerson } from "../../hooks/usePhysicalPerson";
import { PageContainer } from "../../components/PageContainer";
import { Box, styled } from "@mui/material";
import { CardPerson } from "./components/CardPerson";

const ContainerBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

const ContentBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #f5f6f6;
  border-radius: 13px;
  justify-content: start;
  align-items: start;
`;

export const PhysicalPerson = () => {
  const { data, deletePhysicalPerson } = usePhysicalPerson();

  return (
    <PageContainer title="Cadastro de Pessoa Física">
      <ContainerBox>
        {data.map((item) => (
          <CardPerson
            item={item}
            onDelete={deletePhysicalPerson}
            onEdit={() => {}}
          />
        ))}
      </ContainerBox>
    </PageContainer>
  );
};
