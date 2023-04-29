import { Button, IconButton, Popover, Stack } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomModal from "../../components/CustomModal";
import { useState } from "react";
import UpdateInfoModule from "./UpdateInfoModule";
import DeleteModule from "./DeleteModule";
import ExitModule from "./ExitModule";
import { useSelector } from "react-redux";

const styleButton = {
  color: "black",
  textTransform: "none",
  "&:hover": {
    bgcolor: "grey.200",
  },
};

function PoperCardModel(props) {
  const { userType } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalExit, setOpenModalExit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleClickModifier = (e) => {
    e.stopPropagation();
    setOpenModalUpdate(true);
  };

  const handleClickDelete = (e) => {
    e.stopPropagation();
    setOpenModalDelete(true);
  };

  const handleClickExit = (e) => {
    e.stopPropagation();
    setOpenModalExit(true);
  };

  return (
    <div>
      <CustomModal open={openModalUpdate} setOpen={setOpenModalUpdate}>
        <UpdateInfoModule
          module={props.module}
          refetch={props.refetch}
          setOpen={setOpenModalUpdate}
        />
      </CustomModal>
      <CustomModal open={openModalDelete} setOpen={setOpenModalDelete}>
        <DeleteModule
          module={props.module}
          setOpen={setOpenModalDelete}
          refetch={props.refetch}
        />
      </CustomModal>
      <CustomModal open={openModalExit} setOpen={setOpenModalExit}>
        <ExitModule
          module={props.module}
          setOpen={setOpenModalExit}
          refetch={props.refetch}
        />
      </CustomModal>
      <IconButton
        sx={{
          borderRadius: 1,
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleClick(e);
        }}
      >
        <MoreVertIcon
          sx={{
            color: "white",
          }}
        />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={(e) => {
          e.stopPropagation();
          handleClick(e);
        }}
        //   change the place to bottonend
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Stack
          spacing={0.2}
          sx={{
            bgcolor: "white",
            borderRadius: 1,
            boxShadow: 1,
            padding: 1,
            "&:hover": {
              boxShadow: 3,
            },
          }}
        >
          {userType === "Teacher" ? (
            <Stack>
              <Button onClick={handleClickModifier} sx={styleButton}>
                Modifier
              </Button>
              <Button onClick={handleClickDelete} sx={styleButton}>
                Supprimer
              </Button>
            </Stack>
          ) : (
            <Button onClick={handleClickExit} sx={styleButton}>
              Sortir
            </Button>
          )}
        </Stack>
      </Popover>
    </div>
  );
}

export default PoperCardModel;
