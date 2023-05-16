import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import CustomCardApercu from "./CustomCardApercu";

import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import WarningIcon from "@mui/icons-material/Warning";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CustomModalForStudentsStatistiques from "./CustomModalForStatistiques";

function StatistiquesNotes(props) {
  const { max, min, avg } = props.marks;

  const { studentLessThanElim, studentsNotValidated, studentsValidated } =
    props.students;

  const module = props.module;

  const [openStuentNotValidated, setOpenStuentNotValidated] =
    React.useState(false);
  const [rowsStudentValidated, setRowsStudentValidated] = React.useState([]);

  const [openStudentLessThanElim, setOpenStudentLessThanElim] =
    React.useState(false);
  const [rowsStudentLessThanElim, setRowsStudentLessThanElim] = React.useState(
    []
  );

  const [openStudentValidated, setOpenStudentValidated] = React.useState(false);
  const [rowsStudentNotValidated, setRowsStudentNotValidated] = React.useState(
    []
  );

  const [openNotMax, setOpenNotMax] = React.useState(false);
  const [rowsNotMax, setRowsNotMax] = React.useState([]);

  const [openNotMin, setOpenNotMin] = React.useState(false);
  const [rowsNotMin, setRowsNotMin] = React.useState([]);

  const handleOpenStudentNotValidated = () => {
    setOpenStuentNotValidated(true);
  };

  const handleOpenStudentValidated = () => {
    setOpenStudentValidated(true);
  };

  const handleOpenStudentLessThanElim = () => {
    setOpenStudentLessThanElim(true);
  };

  const handleOpenStudentMaxNote = () => {
    setOpenNotMax(true);
  };

  const handleOpenStudentMinNote = () => {
    setOpenNotMin(true);
  };

  React.useEffect(() => {
    if (studentsValidated) {
      const rows = studentsValidated.map((mark) => {
        return {
          id: mark._id,
          cne: mark.student.codeMassar,
          name: mark.student.fullName,
          note: mark.mark,
        };
      });
      setRowsStudentValidated(rows);
    }
  }, [studentsValidated]);

  React.useEffect(() => {
    if (studentsNotValidated) {
      const rows = studentsNotValidated.map((mark) => {
        return {
          id: mark._id,
          cne: mark.student.codeMassar,
          name: mark.student.fullName,

          note: mark.mark,
        };
      });
      setRowsStudentNotValidated(rows);
    }
  }, [studentsNotValidated]);

  React.useEffect(() => {
    if (studentLessThanElim) {
      const rows = studentLessThanElim.map((mark) => {
        return {
          id: mark._id,
          cne: mark.student.codeMassar,
          name: mark.student.fullName,
          note: mark.mark,
        };
      });
      setRowsStudentLessThanElim(rows);
    }
  }, [studentLessThanElim]);

  React.useEffect(() => {
    if (max) {
      const rows = max.map((mark) => {
        return {
          id: mark._id,
          cne: mark.student.codeMassar,
          name: mark.student.fullName,
          note: mark.mark,
        };
      });
      setRowsNotMax(rows);
    }
  }, [max]);

  React.useEffect(() => {
    if (min) {
      const rows = min.map((mark) => {
        return {
          id: mark._id,
          cne: mark.student.codeMassar,
          name: mark.student.fullName,
          note: mark.mark,
        };
      });
      setRowsNotMin(rows);
    }
  }, [min]);

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        width: "100%",
        padding: "10px",
        border: "1px solid #eaeaea",
        borderRadius: "5px",
      }}
    >
      <Typography
        sx={{
          color: "#231942",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Statistiques des notes
      </Typography>
      <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <CustomCardApercu
            number={avg ? avg : 0}
            text="Note Moyenne"
            backgroundColor="#606c38"
            icon={<BarChartIcon />}
          />
          <CustomCardApercu
            number={max.length ? max[0].mark : 0}
            text="Note Max"
            backgroundColor="#e76f51"
            enabled={true}
            onClick={handleOpenStudentMaxNote}
            icon={<TrendingUpIcon />}
          />
          <CustomModalForStudentsStatistiques
            open={openNotMax}
            setOpen={setOpenNotMax}
            rows={rowsNotMax}
            title="Liste des étudiants ayant la note maximale"
          />
          <CustomCardApercu
            number={min.length ? min[0].mark : 0}
            text="Note Min"
            enabled={true}
            onClick={handleOpenStudentMinNote}
            backgroundColor="#f4a261"
            icon={<TrendingDownIcon />}
          />
          <CustomModalForStudentsStatistiques
            open={openNotMin}
            setOpen={setOpenNotMin}
            rows={rowsNotMin}
            title="Liste des étudiants ayant la note minimale"
          />
          <CustomCardApercu
            number={studentsNotValidated ? studentsNotValidated.length : 0}
            text={
              module.cycle === "préparatoire"
                ? "Nombre de notes inférieures à 10"
                : "Nombre de notes inférieures à 12"
            }
            enabled={true}
            onClick={handleOpenStudentNotValidated}
            backgroundColor="#e9c46a"
            icon={<WarningIcon />}
          />
          <CustomModalForStudentsStatistiques
            open={openStuentNotValidated}
            setOpen={setOpenStuentNotValidated}
            rows={rowsStudentNotValidated}
            title={
              module.cycle === "préparatoire"
                ? "Liste des étudiants ayant une note inférieure à 10"
                : "Liste des étudiants ayant une note inférieure à 12"
            }
          />
          <CustomCardApercu
            number={studentsValidated ? studentsValidated.length : 0}
            text={
              module.cycle === "préparatoire"
                ? "Nombre de notes supérieures à 10"
                : "Nombre de notes supérieures à 12"
            }
            backgroundColor="#264653"
            enabled={true}
            onClick={handleOpenStudentValidated}
            icon={<ThumbUpIcon />}
          />
          <CustomModalForStudentsStatistiques
            open={openStudentValidated}
            setOpen={setOpenStudentValidated}
            rows={rowsStudentValidated}
            title={
              module.cycle === "préparatoire"
                ? "Liste des étudiants ayant une note supérieure à 10"
                : "Liste des étudiants ayant une note supérieure à 12"
            }
          />
          <CustomCardApercu
            number={studentLessThanElim ? studentLessThanElim.length : 0}
            text="Nombre de notes eliminatoires"
            backgroundColor="#2a9d8f"
            onClick={handleOpenStudentLessThanElim}
            enabled={true}
            icon={<ThumbDownIcon />}
          />
          <CustomModalForStudentsStatistiques
            open={openStudentLessThanElim}
            setOpen={setOpenStudentLessThanElim}
            rows={rowsStudentLessThanElim}
            title="Liste des étudiants ayant une note eleminatoire"
          />
        </Grid>
      </Box>
    </Stack>
  );
}

export default StatistiquesNotes;
