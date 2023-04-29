import Lottie from "lottie-react";
import happy from "../../static/lotties/happy.json";

import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { Stack, Typography } from "@mui/material";
import CustomTaskStudentNotAnswer from "./CustomTaskStudentNotAnswer";

function StudentsNotAnswer(props) {
  const { isLoading, studentsNotAnswer } = props;
  return (
    <Stack spacing={1}>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        Les eleves qui n'ont pas fait cette tache
      </Typography>
      {isLoading ? (
        <LoadingPage />
      ) : studentsNotAnswer.length ? (
        <Stack spacing={1}>
          {studentsNotAnswer.map((s, i) => (
            <CustomTaskStudentNotAnswer key={i} student={s} task={props.task} />
          ))}
        </Stack>
      ) : (
        <Stack alignItems="center">
          <Lottie
            animationData={happy}
            loop={true}
            style={{ height: "80px" }}
          />

          <Typography>Tous les eleves ont fait cette tache</Typography>
        </Stack>
      )}
    </Stack>
  );
}

export default StudentsNotAnswer;
