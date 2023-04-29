import CustomPageWithoutDrawer from "../../components/CustomPageWithoutDrawer";
import { Stack } from "@mui/material";
import AllModules from "./AllModules";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { getAllModules } from "../../redux/api/moduleApi";

function ModulesPage() {
  const { userType, user } = useSelector((state) => state.auth);

  const [modules, setModules] = useState([]);

  const { isLoading, refetch, isRefetching } = useQuery({
    queryKey: "modules",
    enabled: false,
    queryFn: () => {
      return getAllModules(user._id, userType, user.token);
    },

    onSuccess: (data) => {
      setModules(data.data.modules);
    },
  });

  useEffect(() => {
    refetch();
  }, [modules, refetch]);

  if (isLoading) return <LoadingPage />;

  return (
    <CustomPageWithoutDrawer>
      <Stack spacing={2}>
        <AllModules modules={modules} refetch={refetch} />
      </Stack>
    </CustomPageWithoutDrawer>
  );
}

export default ModulesPage;
