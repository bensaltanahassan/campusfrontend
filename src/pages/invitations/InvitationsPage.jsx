import React, { useMemo } from "react";
import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useMutation, useQuery } from "react-query";
import {
  confirmInvitations,
  getInvitations,
  rejectInvitations,
} from "../../redux/api/moduleApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import CustomNoDataTable from "../NotesPage/NoDataTable";
import SnackBar from "../../components/SnackBar";
import { useEffect } from "react";

function InvitationsPage() {
  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);
  const [invitations, setInvitations] = React.useState([]);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");
  const [snackBarSeverity, setSnackBarSeverity] = React.useState("success");

  const [rows, setRows] = React.useState([]);

  const columns = [
    { field: "name", headerName: "Nom Complet", flex: 1 },
    { field: "cne", headerName: "CNE", flex: 1 },
    { field: "cni", headerName: "CNI", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },

    {
      field: "confirm",
      headerName: "Confirmer",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <GridActionsCellItem
          sx={{
            color: "green",
            border: "1px solid rgba(0, 0, 0, 0.23)",
            borderRadius: "4px",
            width: "100%",
          }}
          icon={<CheckIcon />}
          label="Confirmer"
          onClick={() => {
            handleConfirmInvitation(params);
          }}
        />
      ),
    },
    {
      field: "refuse",
      headerName: "Refuser",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <GridActionsCellItem
          sx={{
            color: "red",
            border: "1px solid rgba(0, 0, 0, 0.23)",
            borderRadius: "4px",
            width: "100%",
          }}
          icon={<ClearIcon />}
          label="Refuser"
          onClick={() => {
            handleRefuseInvitation(params);
          }}
        />
      ),
    },
  ];

  const { isLoading: isLoadingGet, isFetching } = useQuery({
    queryKey: "getInvitations",
    queryFn: () => getInvitations(id, user.token),
    onSuccess: (data) => {
      setInvitations(data.data.invitations);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { isLoading, mutate } = useMutation(
    ({ accept, invitId }) => {
      // delete it from invitations
      const newInvitations = invitations.filter(
        (invit) => invit._id !== invitId
      );
      setInvitations(newInvitations);

      // delete it from rows
      const newRows = rows.filter((row) => row.id !== invitId);
      setRows(newRows);

      return accept
        ? confirmInvitations(id, user.token, invitId)
        : rejectInvitations(id, user.token, invitId);
    },
    {
      mutationKey: "handleInvit",
      onSuccess: (data) => {
        setOpenSnackBar(true);
        setSnackBarMessage(data.data.message);
        setSnackBarSeverity("success");
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  // update the component when isLoadingGet is false
  useEffect(() => {
    if (!isLoadingGet) {
      let newRows = [];
      for (let i = 0; i < invitations.length; i++) {
        const row = {
          id: invitations[i]._id,
          name: invitations[i].student.fullName,
          cne: invitations[i].student.codeMassar,
          cni: invitations[i].student.cin,
          phone: invitations[i].student.phoneNumber,
        };
        newRows.push(row);
      }
      setRows(newRows);
    }
  }, [isLoadingGet, invitations]);

  const handleConfirmInvitation = (params) => {
    mutate({ accept: true, invitId: params?.row?.id });
  };

  const handleRefuseInvitation = (params) => {
    mutate({ accept: false, invitId: params?.row?.id });
  };

  if (isLoadingGet || isLoading) return <LoadingPage />;

  return (
    <CustomPageWithDrawer>
      <SnackBar
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        message={snackBarMessage}
        type={snackBarSeverity}
      />

      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnMenu
        disableRowSelectionOnClick
        editMode="row"
        rowsPerPageOptions={[5, 15, 30]}
        slots={{
          noRowsOverlay: () => (
            <CustomNoDataTable message="Aucune invitation" />
          ),
        }}
        sx={{ height: "calc(100vh - 64px - 48px - 48px)" }}
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
            labelRowsPerPage: "Invitations par page",
          },
        }}
      />
    </CustomPageWithDrawer>
  );
}

export default InvitationsPage;
