import { formatPhone } from "../../../../utils/format-phone";
import { formatCpf } from "../../../../utils/format-cpf";
import { Box, styled, Typography, Collapse } from "@mui/material";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { PhysicalPersonType } from "../../../../types/physical-person";

const ContentBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background-color: #f5f6f6;
  border-radius: 13px;
  justify-content: start;
  align-items: start;
`;

const HeaderBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
`;

const DataBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  color: #4b4e53;
  margin-top: 8px;
`;

const AddressBox = styled(Box)`
  display: flex;
  flex-direction: row;
  jsutify-content: start;
  gap: 8px;
  cursor: pointer;
  align-items: center;
  padding-top: 8px;
`;

type Props = {
  item: PhysicalPersonType;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};
export const CardPerson = ({ item, onDelete, onEdit }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <ContentBox key={item.id}>
      <HeaderBox>
        <Typography
          variant="h2"
          component="h2"
          color="#252525"
          fontSize={18}
          fontWeight="bold"
        >
          Nome: {item.name}
        </Typography>

        <Box display={"flex"} gap={1}>
          <Pencil
            color="#4B4E53"
            cursor={"pointer"}
            onClick={() => {
              onEdit(item.id);
            }}
          />
          <Trash2
            color="#4B4E53"
            cursor={"pointer"}
            onClick={() => {
              onDelete(item.id);
            }}
          />
        </Box>
      </HeaderBox>
      <DataBox>
        <Typography>Telefone: {formatPhone(item.phone)}</Typography>
        <Typography>Cpf: {formatCpf(item.cpf)}</Typography>
      </DataBox>

      <Box>
        <AddressBox onClick={handleOpen}>
          {open && <ChevronUp />}
          {!open && <ChevronDown />}

          <Typography
            variant="h3"
            component="h3"
            color="#252525"
            fontWeight="bold"
            fontSize={16}
          >
            Endereços
          </Typography>
        </AddressBox>

        {item.addresses.map((address:any) => (
          <Collapse in={open} key={address.id}>
            <DataBox>
              <Typography>Estado: {address.state}</Typography>
              <Typography>Cidade: {address.city}</Typography>
              <Typography>Complemento: {address.complement}</Typography>
              <Typography>Bairro: {address.neighborhood}</Typography>
              <Typography> Número: {address.number}</Typography>
            </DataBox>
          </Collapse>
        ))}
      </Box>
    </ContentBox>
  );
};
