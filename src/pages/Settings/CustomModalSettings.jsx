import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import CustomModal from "../../components/CustomModal";

function CustomModalSettings(props) {
  return (
    <div>
      <CustomModal open={props.open} setOpen={props.setOpen}>
        <Stack>
          <Typography
            sx={{
              color: "#231942",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {props.title}
          </Typography>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <TextField
            id="outlined-basic"
            onChange={props.onChange}
            label={props.label}
            variant="outlined"
            defaultValue={props.defaultValue}
            fullWidth
            error={props.error}
            helperText={props.helperText}
            onSubmit={() => {}}
            type={
              props.type === "password"
                ? "password"
                : props.type === "email"
                ? "email"
                : "text"
            }
          />
          <Stack
            direction="row"
            spacing={2}
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                props.setOpen(false);
              }}
            >
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
                Annuler
              </Typography>
            </Button>

            <Button variant="contained" onClick={props.onSave}>
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
                Enregistrer
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </CustomModal>
    </div>
  );
}

export default CustomModalSettings;
