import React, { useState } from "react";
import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";
import { Stack, Typography } from "@mui/material";

import TaskDetailsContent from "./TaskDetailsContent";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { getSingleTask } from "../../redux/api/moduleApi";
import { useParams } from "react-router-dom";
import TaskCompletionTeacher from "./TaskCompletionTeacher";
import TaskCompletionStudent from "./TaskCompletionStudent";

function TaskDetailsPage() {
  const { userType, user } = useSelector((state) => state.auth);
  const [taskCompletion, setTaskCompletion] = useState(null);
  const [allTaskCompletion, setAllTaskCompletion] = useState([]);

  const [task, setTask] = useState(null);
  const { id: moduleId, taskId } = useParams();
  const { isLoading } = useQuery({
    queryKey: "taskDetail",
    queryFn: () => {
      return getSingleTask(moduleId, taskId, user.token);
    },
    onSuccess: (data) => {
      setTask(data.data.task);
      setAllTaskCompletion(data.data.taskCompletion);

      const tmp = data.data.taskCompletion.find(
        (e) => e.student._id === user._id
      );
      setTaskCompletion(tmp);
    },
  });

  if (isLoading) return <LoadingPage />;

  return (
    <CustomPageWithDrawer>
      <Stack spacing={2}>
        <Typography variant="h4">Details du taches</Typography>
        <TaskDetailsContent task={task} />
        {userType === "Teacher" ? (
          <TaskCompletionTeacher
            taskCompletion={allTaskCompletion}
            task={task}
          />
        ) : (
          task && (
            <TaskCompletionStudent
              taskCompletion={taskCompletion}
              task={task}
            />
          )
        )}
      </Stack>
    </CustomPageWithDrawer>
  );
}

export default TaskDetailsPage;
