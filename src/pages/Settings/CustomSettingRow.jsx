import { Button, Stack, Typography } from "@mui/material";
import React from "react";

function CustomSettingRow(props) {
  return (
    <Stack
      direction="row"
      sx={{
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Stack>
        <Typography
          sx={{
            color: "#231942",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {props.title}
        </Typography>
        <Typography
          sx={{
            textDecoration: "none",
            color: "#4a4360",
            fontSize: "14px",
          }}
        >
          {props.value}
        </Typography>
      </Stack>
      <Button onClick={props.onClick}>
        <Typography
          variant="inherit"
          noWrap
          sx={{
            textTransform: "none",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",

            "&:hover": {
              color: "blueviolet",
            },
          }}
        >
          {props.buttonText}
        </Typography>
      </Button>
    </Stack>
  );
}

export default CustomSettingRow;
