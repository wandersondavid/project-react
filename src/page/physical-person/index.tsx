import { usePhysicalPerson } from "../../hooks/usePhysicalPerson";
import { PageContainer } from "../../components/page-container";
import { Box, Button, Divider, styled, Typography } from "@mui/material";
import { CardPerson } from "./components/card-person";
import { DialogForm } from "./components/dialog-form";
import { Form } from "./components/form";
import { SkeletonPage } from "./components/skeleton-page";

const ContainerBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

const ContainerButton = styled(Box)`
  display: flex;
  gap: 16px;
  button {
    width: 200px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    button {
      width: 100%;
    }
  }
`;

const ButtonStyled = styled(Button)`
  width: 300px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const PhysicalPerson = () => {
  const {
    data,
    deletePhysicalPerson,
    handleOpenNewPerson,
    handleOpenEditPerson,
    form,
    onSubmit,
    fetchAddress,
    loading,
    open,
    fetchPhysicalPerson,
    requestReportPhysicalPerson,
    requestReport,
    to,
  } = usePhysicalPerson();

  return (
    <PageContainer
      title="Cadastro de Pessoa Física"
      component={
        <ContainerButton>
          <ButtonStyled color="secondary" variant="outlined" onClick={to}>
            Ver relatórios
          </ButtonStyled>

          <ButtonStyled variant="contained" onClick={handleOpenNewPerson}>
            {!requestReport && "Nova pessoa física"}
            {requestReport && "Processando..."}
          </ButtonStyled>
        </ContainerButton>
      }
    >
      <Divider component="p" />
      <ButtonStyled
        color="secondary"
        variant="outlined"
        onClick={requestReportPhysicalPerson}
      >
        Solicitar relatório (CSV)
      </ButtonStyled>
      {loading === "success" && !!data.length && (
        <ContainerBox>
          {data.map((item) => (
            <CardPerson
              item={item}
              onDelete={deletePhysicalPerson}
              onEdit={handleOpenEditPerson}
            />
          ))}
        </ContainerBox>
      )}

      {loading === "success" && !data.length && (
        <Box>
          <Typography variant="h2" component="h2" color="#4B4E53" fontSize={16}>
            Nenhum registro encontrado
          </Typography>
        </Box>
      )}
      {loading === "loading" && <SkeletonPage />}

      {loading === "error-fetching" && (
        <Box
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          gap={2}
        >
          <Typography variant="h2" component="h2" color="#4B4E53" fontSize={16}>
            Error ao carregar os dados
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={fetchPhysicalPerson}
          >
            Tentar novamente
          </Button>
        </Box>
      )}

      <DialogForm open={open} onClose={handleOpenNewPerson}>
        <Form
          form={form}
          onSubmit={onSubmit}
          onClose={handleOpenNewPerson}
          fetchAddress={fetchAddress}
          loading={loading}
        />
      </DialogForm>
    </PageContainer>
  );
};
