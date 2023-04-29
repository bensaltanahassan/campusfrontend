import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import CustomNoDataTable from "./NoDataTable";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { getNotes, updateNotes } from "../../redux/api/moduleApi";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import SnackBar from "../../components/SnackBar";

const columns = [
  {
    field: "cne",
    headerName: "Code Massar",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Nom Complet",
    flex: 1,
  },
  {
    field: "note",
    headerName: "Note",
    type: "number",
    flex: 1,
    editable: true,
  },
];

export default function CustomTableNotes() {
  const [rows, setRows] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("success");

  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [notes, setNotes] = React.useState([]);

  const { isLoading: isLoadingPut, mutate } = useMutation({
    mutationKey: "putNotes",
    mutationFn: (newRow) => {
      let data = {};
      const studentId = notes[newRow.id].student._id;
      const mark = newRow.note;
      data = { studentId, mark };
      return updateNotes(id, user.token, data);
    },
    onSuccess: (data) => {
      setMessage("Notes modifiées avec succès");
      setSeverity("success");
      setOpen(true);
      refetch();
    },
    onError: (error) => {
      setSeverity("error");
      setMessage("Une erreur est survenue lors de la modification des notes");
      setOpen(true);
    },
  });

  const {
    isLoading: isLoadingGet,
    error: errorGet,
    refetch,
  } = useQuery({
    queryKey: "getNotes",
    queryFn: () => getNotes(id, user.token),
    onSuccess: (data) => {
      setNotes(data.data.notes);
      let newRows = [];
      let row = {};
      for (let i = 0; i < data.data.notes.length; i++) {
        row = {
          id: i,
          cne: data.data.notes[i].student.codeMassar,
          name: data.data.notes[i].student.fullName,
          note: data.data.notes[i].mark,
        };
        newRows.push(row);
      }
      setRows(newRows);
    },
  });

  React.useEffect(() => {
    refetch();
  }, [refetch, setNotes]);

  const processRowUpdate = React.useCallback(
    async (newRow) => {
      if (newRow.note < 0 || newRow.note > 20) {
        setSeverity("error");
        setMessage("La note doit être entre 0 et 20");
        setOpen(true);
        return;
      }
      mutate(newRow);
    },
    [mutate]
  );

  const handleProcessRowUpdateError = React.useCallback((error) => {}, []);

  if (isLoadingGet || isLoadingPut) return <LoadingPage />;

  if (errorGet)
    return (
      <ErrorPage
        message={
          "Une erreur est survenue lors de la récupération des notes du module"
        }
      />
    );

  return (
    <Box>
      <DataGrid
        aria-label="Notes"
        disableColumnMenu
        editMode="row"
        sx={{ height: "calc(100vh - 64px - 48px - 48px)" }}
        slots={{
          noRowsOverlay: () => (
            <CustomNoDataTable message="Aucun Etudiant trouvé" />
          ),
        }}
        localeText={{
          MuiTablePagination: {
            labelDisplayedRows: ({ from, to, count }) =>
              `${from} - ${to} sur ${count !== -1 ? count : `plus de ${to}`}`,
            labelRowsPerPage: "Etudiants par page",
          },
        }}
        rowsPerPageOptions={[5, 15, 30]}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        pageSizeOptions={[5, 10, 15, 30]}
      />
      <SnackBar
        open={open}
        setOpen={setOpen}
        message={message}
        type={severity}
      />
    </Box>
  );
}
