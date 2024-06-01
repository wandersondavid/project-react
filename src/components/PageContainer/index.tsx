import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = {
  children: React.ReactNode;
  title: string;
  component?: JSX.Element;
};

const CustomContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 50px;
`;

const CustomTypography = styled(Typography)`
  color: #4b4e53;
  font-size: 24px;
  font-weight: 700;
`;

const HeaderBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

export const PageContainer = ({
  children,
  title,
  component,
}: Props): JSX.Element => {
  return (
    <>
      <CustomContainer>
        <HeaderBox>
          {title && (
            <CustomTypography variant="h1" gutterBottom>
              {title}
            </CustomTypography>
          )}
          {component && component}
        </HeaderBox>

        {children}
      </CustomContainer>
    </>
  );
};
