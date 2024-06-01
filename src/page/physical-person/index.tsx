import { usePhysicalPerson } from "../../hooks/usePhysicalPerson";
import { PageContainer } from "../../components/PageContainer";
import { Box, Button, styled } from "@mui/material";
import { CardPerson } from "./components/CardPerson";
import { DialogForm } from "./components/DialogForm";
import { useState } from "react";
import { Form } from "./components/Form";

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
    button {
      width: 100%;
    }
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
  } = usePhysicalPerson();

  return (
    <PageContainer
      title="Cadastro de Pessoa Física"
      component={
        <ContainerButton>
          <Button color="secondary" variant="outlined" onClick={() => {}}>
            Ver relatórios
          </Button>

          <Button variant="contained" onClick={handleOpenNewPerson}>
            Nova pessoa física
          </Button>
        </ContainerButton>
      }
    >
      <Button
        sx={{ width: 300 }}
        color="secondary"
        variant="outlined"
        onClick={() => {}}
      >
        Solicitar relatório (CSV)
      </Button>
      <ContainerBox>
        {data.map((item) => (
          <CardPerson
            item={item}
            onDelete={deletePhysicalPerson}
            onEdit={handleOpenEditPerson}
          />
        ))}
      </ContainerBox>

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
