import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import CustomNoDataTable from "../NotesPage/NoDataTable";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Typography } from "@mui/material";
import { getAllTasks } from "../../redux/api/moduleApi";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import axios from "axios";
import { useNavigate } from "react-router";

function TableTasks(props) {
  const columns = [
    {
      field: "fichier",
      headerName: "Fichier",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        if (params.row.fichier)
          return (
            <GridActionsCellItem
              sx={{
                color: "red",
                border: "1px solid rgba(0, 0, 0, 0.23)",
                borderRadius: "4px",
                mt: 1,
                mb: 1,
                width: "100%",
              }}
              icon={
                <FileDownloadIcon
                  sx={{
                    color: "green",
                  }}
                />
              }
              label="telecherger"
              onClick={(e) => {
                handleClickDownload(e, params.row.fichier);
              }}
            />
          );
        else
          return (
            <Typography
              sx={{
                color: "red",
                mt: 1,
                mb: 1,
                textAlign: "center",
              }}
            >
              Pas de fichier
            </Typography>
          );
      },
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      sortable: false,
    },
    {
      field: "debut",
      headerName: "Debut",
      flex: 1,
      sortable: false,
    },
    {
      field: "fin",
      headerName: "Fin",
      flex: 1,
      sortable: false,
    },
    {
      field: "bonus",
      headerName: "Bonus",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Typography
          sx={{
            color: "green",
            textAlign: "center",
          }}
        >
          +{params.row.bonus} points
        </Typography>
      ),
    },
    {
      field: "penalty",
      headerName: "Penalty",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Typography
          sx={{
            textAlign: "center",
            color: "red",
          }}
        >
          -{params.row.penalty} points
        </Typography>
      ),
    },
  ];

  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const { id: moduleId } = useParams();
  const { user } = useSelector((state) => state.auth);

  const { refetch: rf, setRefetch } = props;

  const { isLoading, refetch } = useQuery({
    queryKey: "getAlltasks",
    queryFn: () => {
      return getAllTasks(moduleId, user.token);
    },
    onSuccess: (data) => {
      let newRows = [];
      data.data.tasks.forEach((task) => {
        newRows.push({
          id: task._id,
          fichier: task.file,
          description: task.description,
          debut: task.debut,
          fin: task.fin,
          bonus: task.bonus,
          penalty: task.penalty,
        });
      });
      setRows(newRows);
    },
    onError: () => {},
  });
  useEffect(() => {
    if (rf) refetch();
  }, [rf, setRefetch, refetch]);

  const [isDownloading, setIsDownloading] = useState(false);

  const handleClickDownload = async (event, file) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isDownloading) {
      setIsDownloading(true);

      try {
        console.log("download");
        const response = await axios.get(
          `https://campusapi-gljq.onrender.com/files/download/${file._id}`,
          {
            responseType: "blob",
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file.name);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const goToTaskDetail = (params) => {
    navigate(`${params.id}`);
  };

  if (isLoading) return <LoadingPage />;

  return (
    <DataGrid
      sx={{ height: "calc(100vh - 64px - 48px - 48px)" }}
      getRowHeight={() => "auto"}
      rows={rows}
      onRowClick={goToTaskDetail}
      columns={columns}
      disableColumnMenu
      showCellVerticalBorder
      showColumnVerticalBorder
      disableRowSelectionOnClick
      editMode="row"
      rowsPerPageOptions={[5, 15, 30]}
      slots={{
        noRowsOverlay: () => (
          <CustomNoDataTable message="Aucun travail a faire" />
        ),
      }}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[5, 10, 15, 30]}
      localeText={{
        MuiTablePagination: {
          labelDisplayedRows: ({ from, to, count }) =>
            `${from} - ${to} sur ${count !== -1 ? count : `plus de ${to}`}`,
          labelRowsPerPage: "taches par page",
        },
      }}
    />
  );
}

export default TableTasks;
