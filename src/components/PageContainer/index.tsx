import { Box, Container, Typography } from "@mui/material";

type Props = {
  children: React.ReactNode;
  title: string;
};

export const PageContainer = ({ children, title }: Props): JSX.Element => {
  return (
    <>
      <Container>
        {title && (
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
        )}
        <Box sx={{ my: 2 }}>{children}</Box>
      </Container>
    </>
  );
};
