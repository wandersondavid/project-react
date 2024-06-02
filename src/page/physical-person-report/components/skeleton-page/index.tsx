import { Box, Skeleton } from "@mui/material";

export const SkeletonPage = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2} width={"100%"}>
      <Skeleton variant="rectangular" width={"100%"} height={100} />
      <Skeleton variant="rectangular" width={"100%"} height={100} />
      <Skeleton variant="rectangular" width={"100%"} height={100} />
      <Skeleton variant="rectangular" width={"100%"} height={100} />
    </Box>
  );
};
