import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import SnackBar from "../../components/SnackBar";
import { useMutation } from "react-query";
import { updateModule } from "../../redux/api/moduleApi";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";

function UpdateInfoModule(props) {
  const [messageSnackBar, setMessageSnackBar] = useState("");
  const [typeSnackBar, setTypeSnackBar] = useState(undefined);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const [valuesUpdate, setValuesUpdate] = useState({
    name: props.module.name,
    classe: props.module.classe,
  });

  const { isLoading, mutate } = useMutation({
    mutationKey: "updateModule",
    mutationFn: () => {
      return updateModule(
        props.module._id,
        user.token,
        valuesUpdate.name,
        valuesUpdate.classe
      );
    },
    onSuccess: (data) => {
      props.refetch();
      setMessageSnackBar("Le module a été modifié avec succès");
      setTypeSnackBar("success");
      setOpenSnackBar(true);
    },
    onError: (err) => {
      setMessageSnackBar(err.response.data.message);
      setTypeSnackBar("error");
      setOpenSnackBar(true);
      // delayed 3 second then close it
      setTimeout(() => {}, 1000);
      props.setOpen(false);
    },
  });

  const handleUpdateModule = () => {
    if (valuesUpdate.name !== "" && valuesUpdate.classe !== "") {
      mutate();
    }
  };
  return (
    <div>
      <SnackBar
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        message={messageSnackBar}
        type={typeSnackBar}
      />

      <Stack spacing={2}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "black",
            textAlign: "center",
          }}
        >
          Modifier les informations du module Analyse 2
        </Typography>
        <TextField
          onClick={(e) => {
            e.stopPropagation();
          }}
          label="Nom du module"
          defaultValue={valuesUpdate.name}
          onChange={(e) => {
            setValuesUpdate({
              ...valuesUpdate,
              name: e.target.value,
            });
          }}
          sx={{
            bgcolor: "white",
            borderRadius: 1,
            boxShadow: 1,
            "&:hover": {
              boxShadow: 3,
            },
          }}
        />
        <TextField
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            setValuesUpdate({
              ...valuesUpdate,
              classe: e.target.value,
            });
          }}
          label="Classe"
          defaultValue={valuesUpdate.classe}
          sx={{
            bgcolor: "white",
            borderRadius: 1,
            boxShadow: 1,
            "&:hover": {
              boxShadow: 3,
            },
          }}
        />
        <Divider />
        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: "center",
            marginTop: 2,
          }}
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
              props.setOpen(false);
            }}
            variant="contained"
            sx={{
              color: "white",
              textTransform: "none",
              bgcolor: "red",
              "&:hover": {
                bgcolor: "red",
              },
            }}
          >
            Annuler
          </Button>

          <LoadingButton
            loading={isLoading}
            onClick={(e) => {
              e.stopPropagation();
              handleUpdateModule();
            }}
            variant="outlined"
            sx={{
              color: "red",
              textTransform: "none",
              "&:hover": {
                bgcolor: "grey.200",
              },
            }}
          >
            Modifier
          </LoadingButton>
        </Stack>
      </Stack>
    </div>
  );
}

export default UpdateInfoModule;
