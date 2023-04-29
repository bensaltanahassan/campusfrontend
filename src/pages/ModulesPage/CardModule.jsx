import {
  Avatar,
  Box,
  Card,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { moduleActions } from "../../redux/slices/moduleSlice";
import PoperCardModel from "./PoperCardModel";

import CopyIcon from "@mui/icons-material/ContentCopy";
import SnackBar from "../../components/SnackBar";

function CardModule(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");
  const [snackBarType, setSnackBarType] = React.useState("");

  // get the user from store
  const { userType } = useSelector((state) => state.auth);

  const [fullUrl, setFullUrl] = React.useState(null);
  const [fileName, setFileName] = React.useState(null);

  const baseUrl = "https://campusapi-gljq.onrender.com/images/";

  React.useEffect(() => {
    setFileName(
      props.module.teacherId.imageUrl.substring(
        props.module.teacherId.imageUrl.lastIndexOf("/") + 1
      )
    );
    setFullUrl(baseUrl + fileName);
  }, [userType, fileName, baseUrl, fullUrl]);

  const handleClickCard = () => {
    dispatch(moduleActions.selectModule(props.module));
    navigate(`${props.module._id}/boards`);
  };

  return (
    <Card
      onClick={handleClickCard}
      sx={{
        height: 150,
        padding: 2,
        borderRadius: 1,
        boxShadow: 1,
        bgcolor: `${props.module.color}70`,
        cursor: "pointer",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <SnackBar
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        message={snackBarMessage}
        type={snackBarType}
      />
      <Stack
        direction="row"
        sx={{
          height: "100%",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {props.module.name}
          </Typography>

          <Typography
            sx={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {props.module.teacherId.fullName}
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
            }}
          >
            Classe: : {props.module.classe}
          </Typography>
          <Stack direction="row">
            <Typography
              sx={{
                fontSize: 13,
              }}
            >
              ID : {props.module.identifiant}
            </Typography>
            <Tooltip title="Copier l'identifiant">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(props.module.identifiant);
                  setSnackBarMessage("Identifiant copié");
                  setSnackBarType("success");
                  setOpenSnackBar(true);
                }}
              >
                <CopyIcon
                  sx={{
                    fontSize: 18,
                  }}
                />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
        <Stack
          spacing={1}
          direction="column"
          sx={{
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <PoperCardModel module={props.module} refetch={props.refetch} />

          <Avatar
            alt={props.module.teacherId.fullName}
            src={fullUrl}
            sx={{
              height: 50,
              width: 50,
              bgcolor: "white",
            }}
          />
        </Stack>
      </Stack>
    </Card>
  );
}

export default CardModule;
