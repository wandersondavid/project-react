import { ValidationPhysicalPerson } from "@/hooks/usePhysicalPerson";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<ValidationPhysicalPerson, any, undefined>;
  onSubmit: () => void;
  onClose: () => void;
  fetchAddress: () => void;
};
const ContainerButton = styled(Box)`
  display: flex;
  gap: 16px;
  button {
    width: 100%;
  }
`;

export const Form = ({ form, onSubmit, onClose, fetchAddress }: Props) => {
  return (
    <Box component="form" onSubmit={onSubmit} noValidate autoComplete="off">
      <Typography
        variant="h2"
        component="h2"
        color="#4B4E53"
        fontSize={16}
        marginTop={2}
        fontWeight="bold"
      >
        {form.formState.isSubmitting
          ? "Editando Pessoa Física"
          : "Cadastrar Pessoa Física"}
      </Typography>
      <Grid container spacing={1} columns={16}>
        <Grid item xs={8}>
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!form.formState.errors.name}
          >
            <TextField
              label="Nome"
              {...form.register("name")}
              variant="outlined"
              fullWidth
              error={!!form.formState.errors.name}
            />
            <FormHelperText>
              {form.formState.errors.name?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!form.formState.errors.phone}
          >
            <TextField
              label="Telefone"
              {...form.register("phone")}
              variant="outlined"
              fullWidth
              error={!!form.formState.errors.phone}
            />
            <FormHelperText>
              {form.formState.errors.phone?.message}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={8}>
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!form.formState.errors.cpf}
          >
            <TextField
              label="CPF"
              {...form.register("cpf")}
              variant="outlined"
              fullWidth
              error={!!form.formState.errors.cpf}
            />
            <FormHelperText>
              {form.formState.errors.cpf?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Typography
        variant="h2"
        component="h2"
        color="#4B4E53"
        fontSize={16}
        marginTop={2}
        fontWeight="bold"
      >
        Endereço
      </Typography>

      <Grid container spacing={1} columns={15}>
        <Grid item xs={5}>
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!form.formState.errors.addresses?.zip_code}
          >
            <TextField
              label="Cep"
              {...form.register("addresses.zip_code")}
              onBlurCapture={fetchAddress}
              variant="outlined"
              fullWidth
              name="zip_code"
              error={!!form.formState.errors.addresses?.zip_code}
            />
            <FormHelperText>
              {!!form.formState.errors.addresses?.zip_code}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={5}>
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!form.formState.errors.addresses?.city}
          >
            <TextField
              label="Cidade"
              {...form.register("addresses.city")}
              variant="outlined"
              fullWidth
              error={!!form.formState.errors.addresses?.city}
            />
            <FormHelperText>
              {form.formState.errors.addresses?.city?.message}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={5}>
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!form.formState.errors.addresses?.state}
          >
            <TextField
              label="Estado"
              {...form.register("addresses.state")}
              variant="outlined"
              fullWidth
              error={!!form.formState.errors.addresses?.state}
            />
            <FormHelperText>
              {form.formState.errors.addresses?.state?.message}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={5}>
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!form.formState.errors.addresses?.neighborhood}
          >
            <TextField
              label="Bairro"
              {...form.register("addresses.neighborhood")}
              variant="outlined"
              fullWidth
              error={!!form.formState.errors.addresses?.neighborhood}
            />
            <FormHelperText>
              {form.formState.errors.addresses?.neighborhood?.message}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={5}>
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!form.formState.errors.addresses?.number}
          >
            <TextField
              label="Número"
              {...form.register("addresses.number")}
              variant="outlined"
              fullWidth
              error={!!form.formState.errors.addresses?.number}
            />
            <FormHelperText>
              {form.formState.errors.addresses?.number?.message}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={5}>
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!form.formState.errors.addresses?.complement}
          >
            <TextField
              label="Complemento"
              {...form.register("addresses.complement")}
              variant="outlined"
              fullWidth
              error={!!form.formState.errors.addresses?.complement}
            />
            <FormHelperText>
              {form.formState.errors.addresses?.complement?.message}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <ContainerButton>
        <Button
          type="button"
          variant="outlined"
          color="secondary"
          onClick={() => {
            onClose();
            form.reset();
          }}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="contained">
          Cadastrar
        </Button>
      </ContainerButton>
    </Box>
  );
};
