import React, { useEffect, useState } from "react";
import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";
import PersonComponent from "../../components/students/PersonComponent";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getStudents } from "../../redux/api/moduleApi";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import SnackBar from "../../components/SnackBar";

function StudentsPage() {
  const baseUrl = "https://campusapi-gljq.onrender.com/images/";

  const [fullUrl, setFullUrl] = useState(null);
  const [fileName, setFileName] = useState(null);

  const { userType, user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [studentArr, setStudentArr] = useState([]);
  const [teacher, setTeacher] = useState({});

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarType, setSnackBarType] = useState("");

  const { isLoading, refetch, data } = useQuery({
    queryKey: "getStudents",
    queryFn: () => getStudents(id, user.token),
    enabled: false,
    onSuccess: (data) => {
      setStudentArr(data.data.students);
      setTeacher(data.data.teacher);
    },
    onError: (error) => {},
  });
  useEffect(() => {
    setFileName(
      data?.data?.teacher.imageUrl.substring(
        data?.data?.teacher.imageUrl.lastIndexOf("/") + 1
      )
    );
    setFullUrl(baseUrl + fileName);
  }, [data, fullUrl, fileName]);

  React.useEffect(() => {
    refetch();
  }, [refetch]);
  if (isLoading) return <LoadingPage />;
  return (
    <CustomPageWithDrawer>
      <Grid>
        <Grid item xs={12}>
          <Box sx={{ mb: 3 }} justifyContent="left">
            <Typography variant="h4" mb={3} style={{ color: "#071A2F" }}>
              Ensaignants
            </Typography>
            <Divider
              sx={{ backgroundColor: "#071A2F", mb: 3 }}
              variant="fullWidth"
            />
            <PersonComponent
              name={teacher.fullName}
              imageUrl={fullUrl}
              user="Teacher"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            display="flex"
            flexDirection="column"
            sx={{ gap: 3 }}
            justifyContent="left"
          >
            <Typography variant="h4" style={{ color: "#071A2F" }}>
              Etudiants
            </Typography>
            <Divider sx={{ backgroundColor: "#071A2F" }} variant="fullWidth" />
            {studentArr.map((student, i) => (
              <PersonComponent
                setSnackBarMessage={setSnackBarMessage}
                setSnackBarType={setSnackBarType}
                setOpenSnackBar={setOpenSnackBar}
                studentArr={studentArr}
                setStudentArr={setStudentArr}
                key={i}
                name={student.fullName}
                id={student._id}
                userType={userType}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
      <SnackBar
        setOpen={setOpenSnackBar}
        open={openSnackBar}
        message={snackBarMessage}
        type={snackBarType}
      />
    </CustomPageWithDrawer>
  );
}

export default StudentsPage;
