import { AddressType } from "./address";

export type PhysicalPersonType = {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  addresses: AddressType[];
};
