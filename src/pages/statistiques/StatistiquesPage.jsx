import { Stack } from "@mui/material";
import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";

import ApercuSection from "../../components/statistiques/ApercuSection";
import StudentsStatistiques from "../../components/statistiques/StudentsStatistiques";
import StatistiquesNotes from "../../components/statistiques/StatistiquesNotes";
import { useQuery } from "react-query";
import { getStatistiques } from "../../redux/api/moduleApi";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorPage from "../ErrorPage/ErrorPage";

function StatistiquePage() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const { isLoading, data, error } = useQuery({
    queryKey: "getStatistiques",
    queryFn: () => getStatistiques(id, user.token),
    onSuccess: (data) => {},
  });

  if (isLoading) return <LoadingPage />;

  if (error)
    return (
      <ErrorPage
        message={
          "Une erreur est survenue lors de la récupération des statistiques du module"
        }
      />
    );

  return (
    <CustomPageWithDrawer>
      <Stack direction="column" spacing={2}>
        <ApercuSection files={data.data.statistiques.files} />
        <StudentsStatistiques students={data.data.statistiques.students} />
        <StatistiquesNotes
          marks={data.data.statistiques.marks}
          students={data.data.statistiques.students}
        />
      </Stack>
    </CustomPageWithDrawer>
  );
}

export default StatistiquePage;
