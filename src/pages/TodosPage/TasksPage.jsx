import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";
import { Typography } from "@mui/material";

import TableTasks from "./TableTasks";
import AddTask from "./AddTask";
import { useSelector } from "react-redux";
import { useState } from "react";

function TasksPage(props) {
  const { userType } = useSelector((state) => state.auth);

  const [refetch, setRefetch] = useState();

  return (
    <CustomPageWithDrawer>
      {userType === "Teacher" && (
        <AddTask refetch={refetch} setRefetch={setRefetch} />
      )}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 1,
        }}
      >
        Les tâches
      </Typography>
      <TableTasks refetch={refetch} setRefetch={setRefetch} />
    </CustomPageWithDrawer>
  );
}

export default TasksPage;
