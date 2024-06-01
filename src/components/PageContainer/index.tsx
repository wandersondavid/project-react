import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = {
  children: React.ReactNode;
  title: string;
};

const CustomContainer = styled(Box)({
  paddingTop: 16,
  paddingBottom: 16,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  justifyContent: "center",
}) as typeof Box;

const CustomTypography = styled(Typography)({
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "start",
}) as typeof Typography;

export const PageContainer = ({ children, title }: Props): JSX.Element => {
  return (
    <>
      <CustomContainer>
        {title && (
          <CustomTypography variant="h1" component="h1" gutterBottom>
            {title}
          </CustomTypography>
        )}
        {children}
      </CustomContainer>
    </>
  );
};
