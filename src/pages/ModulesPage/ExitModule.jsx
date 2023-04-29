import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { exitFromModule } from "../../redux/api/moduleApi";
import { LoadingButton } from "@mui/lab";
import SnackBar from "../../components/SnackBar";

function ExitModule(props) {
  const [messageSnackBar, setMessageSnackBar] = useState("");
  const [typeSnackBar, setTypeSnackBar] = useState(undefined);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const { isLoading, mutate } = useMutation({
    mutationKey: "exitFromModule",
    mutationFn: () => {
      return exitFromModule(props.module._id, user.token, user._id);
    },
    onSuccess: (data) => {
      setMessageSnackBar("Vous avez quitté le module avec succès");
      setTypeSnackBar("success");
      setOpenSnackBar(true);
      // delayed 2 second
      setTimeout(() => {
        props.setOpen(false);
      }, 2000);
      props.refetch();
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

  const handleExitFromModule = () => {
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
          Voulez-vous vraiment sortir du module Analyse 2 ?
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
              handleExitFromModule();
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
            Sortir
          </LoadingButton>
        </Stack>
      </Stack>
    </div>
  );
}

export default ExitModule;
