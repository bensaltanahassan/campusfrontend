import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { answerTask } from "../../redux/api/moduleApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SnackBar from "../../components/SnackBar";
import dayjs from "dayjs";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import axios from "axios";

function TaskCompletionStudent(props) {
  const { id: moduleId, taskId } = useParams();
  const { taskCompletion, task } = props;
  const [messageSnackBar, setMessageSnackBar] = useState(null);
  const [typeSnackBar, setTypeSnackBar] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const { isLoading, mutate } = useMutation({
    mutationKey: "answerTask",
    mutationFn: (data) => {
      return answerTask(moduleId, taskId, user.token, data);
    },
    onSuccess: (data) => {
      setMessageSnackBar("Réponse envoyée avec succès");
      setTypeSnackBar("success");
      setOpenSnackBar(true);
    },
    onError: (err) => {
      setMessageSnackBar("Erreur lors de l'envoi de la réponse");
      setTypeSnackBar("error");
      setOpenSnackBar(true);
    },
  });

  const fileInputRef = useRef(null);
  const [file, setFile] = useState();

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handeSendAnswer = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      mutate(formData);
    }
  };

  const [isDownloading, setIsDownloading] = useState(false);

  const handleClickDownload = async (event, file) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isDownloading) {
      setIsDownloading(true);

      try {
        console.log("download");
        const response = await axios.get(
          `https://campusapi-gljq.onrender.com/files/download/${file._id}`,
          {
            responseType: "blob",
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file.name);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.log(error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  return (
    <Stack>
      <SnackBar
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        message={messageSnackBar}
        type={typeSnackBar}
      />
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        Réponse
      </Typography>
      {taskCompletion ? (
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
          }}
          spacing={2}
        >
          <Typography>{taskCompletion.file.name} </Typography>
          <Tooltip title="Télécharger la réponse">
            <IconButton
              onClick={(e) => {
                handleClickDownload(e, taskCompletion.file);
              }}
            >
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ) : (
        <Stack spacing={1}>
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.23)",
              borderRadius: "4px",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: "red",
              }}
            >
              Vous n'avez pas encore fait cette tache
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: "red",
              }}
            >
              {dayjs(task.end).isBefore(dayjs()) ||
              dayjs(task.end).isSame(dayjs())
                ? 'Vous pouvez la faire en cliquant sur le bouton "Importer un fichier"'
                : "La date limite de cette tache est dépassée"}
            </Typography>
          </Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              alignItems: "center",
            }}
          >
            <Stack
              sx={{
                alignItems: "start",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleUploadButtonClick();
                }}
                sx={{
                  textTransform: "none",
                  width: 200,
                }}
              >
                Importer un fichier
              </Button>
              {file && <Typography>{file.name}</Typography>}
              <input
                type="file"
                accept=".pdf"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                style={{ display: "none" }}
              />
            </Stack>
            <Tooltip
              title={
                dayjs(task.end).isBefore(dayjs()) ||
                dayjs(task.end).isSame(dayjs())
                  ? "Envoyer la réponse"
                  : "La date limite de cette tache est dépassée"
              }
            >
              <LoadingButton
                disabled={
                  !dayjs(task.end).isBefore(dayjs()) &&
                  !dayjs(task.end).isSame(dayjs())
                }
                loading={isLoading}
                variant="contained"
                color="success"
                sx={{
                  textTransform: "none",
                }}
                onClick={handeSendAnswer}
              >
                Envoyer
              </LoadingButton>
            </Tooltip>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

export default TaskCompletionStudent;
