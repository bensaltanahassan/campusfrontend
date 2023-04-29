import { Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomTaskStudent from "./CustomTaskStudent";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getStudents } from "../../redux/api/moduleApi";
import { useSelector } from "react-redux";
import StudentsNotAnswer from "./StudentsNotAnswer";
import Lottie from "lottie-react";
import sad from "../../static/lotties/sad.json";

function TaskCompletionTeacher(props) {
  const { taskCompletion } = props;
  const { id: moduleId } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [studentsNotAnswer, setStudentsNotAnswer] = useState([]);

  const { isLoading } = useQuery({
    queryKey: "getAllStudent",
    queryFn: () => {
      return getStudents(moduleId, user.token);
    },
    onSuccess: (data) => {
      const std = data.data.students.filter((e) => {
        return !taskCompletion.find((e2) => e2.student._id === e._id);
      });
      setStudentsNotAnswer(std);
    },
    onError: (err) => {},
  });

  return (
    <Stack spacing={1}>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        Les eleves qui ont fait cette tache
      </Typography>
      {taskCompletion.length ? (
        <Stack spacing={0.5}>
          {taskCompletion.map((e, i) => (
            <CustomTaskStudent isAnswer key={i} taskCompletion={e} />
          ))}
        </Stack>
      ) : (
        <Stack alignItems="center">
          <Lottie animationData={sad} loop={true} style={{ height: "80px" }} />
          <Typography>Aucun eleve n'a fait cette tache</Typography>
        </Stack>
      )}
      <StudentsNotAnswer
        isLoading={isLoading}
        studentsNotAnswer={studentsNotAnswer}
        task={props.task}
      />
    </Stack>
  );
}

export default TaskCompletionTeacher;
