import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import { useMutation } from "react-query";
import SnackBar from "../../components/SnackBar";
import { useState } from "react";
import { evaluateTask } from "../../redux/api/moduleApi";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

function CustomTaskStudentNotAnswer(props) {
  const { task, student } = props;
  const { id: moduleId, taskId } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [messageSnackBar, setMessageSnackBar] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [typeSnackBar, setTypeSnackBar] = useState(null);

  const { isLoading, mutate } = useMutation({
    mutationKey: "addPoints",
    mutationFn: (point) => {
      return evaluateTask(
        moduleId,
        taskId,
        {
          studentId: student._id,
          point: point,
        },
        user.token
      );
    },
    onSuccess: (data) => {
      setMessageSnackBar("Décrémentation de point savec succès.");
      setTypeSnackBar("success");
      setOpenSnackBar(true);
    },
    onError: (err) => {
      setMessageSnackBar("Erreur lors de la décrémentation de points.");
      setTypeSnackBar("error");
      setOpenSnackBar(true);
    },
  });

  return (
    student && (
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
          <Typography>{student.fullName}</Typography>

          <LoadingButton
            loading={isLoading}
            variant="outlined"
            onClick={() => {
              mutate(-task.penalty);
            }}
            sx={{
              textTransform: "none",
              color: "red",
            }}
          >
            -{task.penalty} points
          </LoadingButton>
        </Stack>
      </Box>
    )
  );
}

export default CustomTaskStudentNotAnswer;
