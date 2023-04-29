import { Copyright } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function OurCopyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{
        // make all items center
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 2,
      }}
    >
      {"Copyright"} <Copyright sx={{ m: 0.5 }} />
      Campus Numérique
      {" " + new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default OurCopyright;
