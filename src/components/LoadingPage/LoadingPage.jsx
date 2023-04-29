import { Box } from "@mui/material";
import React from "react";
import Loading from "../Loading";

function LoadingPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Loading />
    </Box>
  );
}

export default LoadingPage;
