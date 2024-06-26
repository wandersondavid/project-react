import {
  LoadingType,
  ValidationPhysicalPerson,
} from "../../../../hooks/usePhysicalPerson";
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
import { formatCpfInput } from "../../../../utils/format-cpf";
import { formatPhoneInput } from "../../../../utils/format-phone";
import { formatZipCode } from "../../../../utils/format-zip-code";

type Props = {
  form: UseFormReturn<ValidationPhysicalPerson, any, undefined>;
  onSubmit: () => void;
  onClose: () => void;
  fetchAddress: () => void;
  loading: LoadingType;
};
const ContainerButton = styled(Box)`
  display: flex;
  gap: 16px;
  button {
    width: 100%;
  }
`;

export const Form = ({
  form,
  onSubmit,
  onClose,
  fetchAddress,
  loading,
}: Props) => {
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
              InputLabelProps={{
                shrink: true,
              }}
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
              InputLabelProps={{
                shrink: true,
              }}
              label="Telefone"
              {...form.register("phone")}
              onChange={(e) => {
                const phone = e.target.value;
                form.setValue("phone", formatPhoneInput(phone));
              }}
              value={form.watch("phone")}
              inputProps={{
                maxLength: 15,
              }}
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
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                maxLength: 14,
              }}
              label="CPF"
              {...form.register("cpf")}
              onChange={(e) => {
                const cpf = e.target.value;
                form.setValue("cpf", formatCpfInput(cpf));
              }}
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
              InputLabelProps={{
                shrink: true,
              }}
              label="Cep"
              {...form.register("addresses.zip_code")}
              onBlurCapture={fetchAddress}
              onChange={(e) => {
                const zip_code = e.target.value;
                form.setValue("addresses.zip_code", formatZipCode(zip_code));
              }}
              inputProps={{
                maxLength: 9,
              }}
              variant="outlined"
              fullWidth
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
              InputLabelProps={{
                shrink: true,
              }}
              label="Cidade"
              disabled
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
              InputLabelProps={{
                shrink: true,
              }}
              label="Estado"
              disabled
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
              InputLabelProps={{
                shrink: true,
              }}
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
              InputLabelProps={{
                shrink: true,
              }}
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
              InputLabelProps={{
                shrink: true,
              }}
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
          }}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="contained">
          {loading === "submitting" ? "Carregando..." : "Salvar"}
        </Button>
      </ContainerButton>
    </Box>
  );
};
