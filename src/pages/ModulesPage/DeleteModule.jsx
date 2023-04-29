import { Button, Stack, Typography } from "@mui/material";
import { useMutation } from "react-query";
import { deleteModule } from "../../redux/api/moduleApi";
import { useSelector } from "react-redux";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import SnackBar from "../../components/SnackBar";

function DeleteModule(props) {
  const [messageSnackBar, setMessageSnackBar] = useState("");
  const [typeSnackBar, setTypeSnackBar] = useState(undefined);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const { isLoading, mutate } = useMutation({
    mutationKey: "deleteModule",
    mutationFn: () => {
      return deleteModule(props.module._id, user.token);
    },
    onSuccess: (data) => {
      props.refetch();
      setMessageSnackBar("Le module a été supprimé avec succès");
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

  const handleDeleteModule = () => {
    mutate();
  };

  return (
    <div>
      <SnackBar
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        message={messageSnackBar}
        type={typeSnackBar}
      />
      <Stack>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "red",
            textAlign: "center",
          }}
        >
          Voulez-vous vraiment supprimer le module Analyse 2 ?
        </Typography>
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
            variant="outlined"
            sx={{
              color: "red",
              textTransform: "none",
              "&:hover": {
                bgcolor: "grey.200",
              },
            }}
          >
            Annuler
          </Button>

          <LoadingButton
            loading={isLoading}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteModule();
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
            Supprimer
          </LoadingButton>
        </Stack>
      </Stack>
    </div>
  );
}

export default DeleteModule;
