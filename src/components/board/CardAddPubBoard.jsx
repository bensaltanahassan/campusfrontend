import {
  Avatar,
  Button,
  Card,
  Icon,
  IconButton,
  Paper,
  Stack,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { addPub } from "../../redux/api/pubApi";
import { useSelector } from "react-redux";
import CustomDropDawn from "../CustomDropDawn";
import SnackBar from "../SnackBar";
import { useParams } from "react-router-dom";

function CardAddPubBoard(props) {
  const { id } = useParams();

  const fileInputRef = useRef(null);

  const [isHover, setIsHover] = useState(false);
  const [isCardClicked, setIsCardClicked] = useState(false);

  const [file, setFile] = useState();
  const [content, setContent] = useState("");
  let type = "td";

  const { user, userType } = useSelector((state) => state.auth);

  const baseUrl = "https://campusapi-gljq.onrender.com/images/";

  const [fileName, setFileName] = useState(null);
  const [fullUrl, setFullUrl] = useState(null);

  useEffect(() => {
    if (userType === "Teacher") {
      setFileName(user.imageUrl.substring(user.imageUrl.lastIndexOf("/") + 1));
      setFullUrl(baseUrl + fileName);
    }
  }, [userType, fileName, baseUrl, fullUrl]);

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const { isLoading, mutate } = useMutation(addPub, {
    mutationKey: "addPub",
    onSuccess: (data) => {
      setOpenSnackBar(true);

      // close
      setIsHover(false);
      setIsCardClicked(false);
      setContent("");
      setFile(null);
      props.refetch();
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDeleteFile = () => {
    setFile(null);
  };

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleClickCard = () => {
    if (isCardClicked === false && isHover === false) {
      setIsHover(true);
      setIsCardClicked(true);
    }
  };

  const handleAddPub = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    formData.append("content", content);
    formData.append("moduleId", id);
    mutate({ id, data: formData, token: user.token });
  };

  return (
    <Card
      onClick={handleClickCard}
      sx={{
        p: 2.5,
        "&:hover": !isHover && {
          backgroundColor: "lightgrey",
          cursor: "pointer",
        },
      }}
    >
      <SnackBar
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        message="Publication ajoutée avec succès"
        type="success"
      />
      {!isHover ? (
        <Stack direction="row">
          <Avatar
            src={fullUrl}
            sx={{
              mr: 2,
              backgroundColor: "blueviolet",
            }}
          />

          <Typography
            sx={{
              fontSize: "1rem",
              color: "grey",
              display: "flex",
              alignItems: "center",
            }}
          >
            Annoncer quelque chose a votre classe
          </Typography>
        </Stack>
      ) : (
        <Paper
          sx={{
            // backgroundColor:grey[100],
            backgroundColor: "#F8F8FB",
            pt: 1.3,
            pb: 1.3,
            pr: 2,
            pl: 2,
          }}
        >
          <Stack spacing={1}>
            <Typography
              sx={{
                fontSize: "1rem",
                color: "b",
                display: "flex",
                alignItems: "center",
              }}
            >
              Annoncer quelque chose a votre classe
            </Typography>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Ecrivez quelque chose..."
              minRows={10}
              maxRows={30}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                width: "100%",
                resize: "none",
                outline: "none",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
              }}
            />
            {file && (
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  pt: 1,
                  pb: 1,
                  pr: 2,
                  pl: 2,
                  alignItems: "center",
                }}
              >
                <Typography>{file.name}</Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <CustomDropDawn
                    options={["COURS", "TD", "EXAM", "TP"]}
                    setOption={(option) => {
                      type = option;
                      console.log(type);
                    }}
                    option={type}
                  />
                  <Avatar>
                    <Icon>
                      <PictureAsPdfIcon />
                    </Icon>
                  </Avatar>
                  <Avatar
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "50%",
                      border: "1px solid red",
                    }}
                  >
                    <IconButton onClick={handleDeleteFile}>
                      <DeleteOutlineIcon sx={{ color: "red" }} />
                    </IconButton>
                  </Avatar>
                </Stack>
              </Stack>
            )}
            <Stack direction="row" spacing={1} justifyContent="space-between">
              <div>
                <Tooltip title="Importer un fichier">
                  <Avatar
                    sx={{
                      backgroundColor: "white",
                    }}
                  >
                    <IconButton onClick={handleUploadButtonClick}>
                      <UploadIcon
                        sx={{
                          color: "black",
                        }}
                      />
                    </IconButton>
                  </Avatar>
                </Tooltip>
                <input
                  type="file"
                  accept=".pdf"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  style={{ display: "none" }}
                />
              </div>
              <Stack direction="row" spacing={1}>
                <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  onClick={handleAddPub}
                >
                  Publier
                </LoadingButton>
                <Button
                  onClick={() => {
                    setIsHover(false);
                    setIsCardClicked(false);
                  }}
                  variant="outlined"
                >
                  Annuler
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      )}
    </Card>
  );
}

export default CardAddPubBoard;
