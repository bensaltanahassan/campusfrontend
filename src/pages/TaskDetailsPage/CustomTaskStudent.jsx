import { LoadingButton } from "@mui/lab";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "react-query";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import axios from "axios";
import SnackBar from "../../components/SnackBar";
import { evaluateTask } from "../../redux/api/moduleApi";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

function CustomTaskStudent(props) {
  const { id: moduleId, taskId } = useParams();
  const { user } = useSelector((state) => state.auth);

  const { taskCompletion } = props;

  const [messageSnackBar, setMessageSnackBar] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [typeSnackBar, setTypeSnackBar] = useState(null);
  const [typeEvaluate, setTypeEvaluate] = useState("add");

  const { isLoading, mutate } = useMutation({
    mutationKey: "addPoints",
    mutationFn: (point) => {
      return evaluateTask(
        moduleId,
        taskId,
        {
          studentId: taskCompletion.student._id,
          point: point,
        },
        user.token
      );
    },
    onSuccess: (data) => {
      typeEvaluate === "add"
        ? setMessageSnackBar("Points ajoutés avec succès.")
        : setMessageSnackBar("Points retirés avec succès.");

      setTypeSnackBar("success");
      setOpenSnackBar(true);
    },
    onError: (err) => {
      setMessageSnackBar("Erreur lors de l'execution");
      setTypeSnackBar("error");
      setOpenSnackBar(true);
    },
  });

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
    taskCompletion && (
      <Box>
        <SnackBar
          message={messageSnackBar}
          open={openSnackBar}
          setOpen={setOpenSnackBar}
          type={typeSnackBar}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.23)",
            borderRadius: "4px",
            padding: "10px",
            alignItems: "center",
          }}
        >
          <Typography>{taskCompletion.student.fullName}</Typography>
          <Stack direction="row" spacing={1}>
            {props.isAnswer && (
              <Tooltip title="Telecharger la reponse">
                <IconButton
                  onClick={(event) => {
                    handleClickDownload(event, taskCompletion.file);
                  }}
                >
                  <FileDownloadIcon
                    sx={{
                      color: "green",
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}
            {props.isAnswer && (
              <LoadingButton
                loading={isLoading}
                variant="outlined"
                sx={{
                  textTransform: "none",
                  color: "green",
                }}
                onClick={() => {
                  setTypeEvaluate("add");
                  mutate(taskCompletion.task.bonus);
                }}
              >
                +{taskCompletion.task.bonus} points
              </LoadingButton>
            )}
            <LoadingButton
              loading={isLoading}
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "red",
              }}
              onClick={() => {
                setTypeEvaluate("remove");
                mutate(-taskCompletion.task.penalty);
              }}
            >
              -{taskCompletion.task.penalty} points
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
    )
  );
}

export default CustomTaskStudent;
