import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import CustomModal from "../CustomModal";
import { Stack, Typography } from "@mui/material";
import CustomNoDataTable from "../../pages/NotesPage/NoDataTable";

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
  },
];

function CustomModalForStudentsStatistiques(props) {
  return (
    <CustomModal open={props.open} setOpen={props.setOpen}>
      <Stack
        direction="column"
        sx={{
          width: "100%",
          height: "500px",
          overflow: "auto",
        }}
      >
        <Typography
          sx={{
            color: "#231942",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          {props.title}
        </Typography>

        <DataGrid
          aria-label="Notes"
          autoHeight
          disableColumnMenu
          editMode="row"
          slots={{
            noRowsOverlay: CustomNoDataTable,
          }}
          localeText={{
            MuiTablePagination: {
              labelDisplayedRows: ({ from, to, count }) =>
                `${from} - ${to} sur ${count !== -1 ? count : `plus de ${to}`}`,
              labelRowsPerPage: "Etudiants par page",
            },
          }}
          rowsPerPageOptions={[5, 15, 30]}
          rows={props.rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 15, 30]}
        />
      </Stack>
    </CustomModal>
  );
}

export default CustomModalForStudentsStatistiques;
