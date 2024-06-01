import { usePhysicalPerson } from "../../hooks/usePhysicalPerson";
import { PageContainer } from "../../components/PageContainer";
import { Box, Button, styled } from "@mui/material";
import { CardPerson } from "./components/CardPerson";

const ContainerBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

const ContainerButton = styled(Box)`
  display: flex;
  gap: 16px;
`;

export const PhysicalPerson = () => {
  const { data, deletePhysicalPerson } = usePhysicalPerson();

  return (
    <PageContainer
      title="Cadastro de Pessoa Física"
      component={
        <ContainerButton>
          <Button color="secondary" onClick={() => {}}>
            Ver relatórios
          </Button>

          <Button variant="contained"  onClick={() => {}}>
            Nova pessoa física
          </Button>
        </ContainerButton>
      }
    >
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
