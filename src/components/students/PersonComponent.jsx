import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteStudent } from "../../redux/api/moduleApi";
import { useMutation } from "react-query";
import SnackBar from "../SnackBar";

function PersonComponent(props) {
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const name = props.name;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { mutate } = useMutation({
    mutationKey: "removeStudent",
    mutationFn: () => {
      return deleteStudent(id, user.token, props.id);
    },
    onSuccess: (data) => {
      props.setSnackBarMessage(data.data.message);
      props.setSnackBarType("success");
      props.setOpenSnackBar(true);
      props.setStudentArr(
        props.studentArr.filter((student) => student._id !== props.id)
      );
    },
    onError: (err) => {
      props.setSnackBarMessage("Une erreur s'est produite");
      props.setSnackBarType("error");
      props.setOpenSnackBar(true);
    },
  });
  const handleDelete = () => {
    mutate();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}>
        <Avatar
          sx={{
            width: 48,
            height: 48,
            marginRight: "16px",
          }}
          src={props.imageUrl ? props.imageUrl : null}
        />
        <Box
          sx={{
            fontWeight: "bold",
            fontSize: "18px",
          }}>
          {name}
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        {!props.user && props.userType === "Teacher" && (
          <IconButton sx={{ color: "#666" }} onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem
          onClick={() => {
            handleClose();
            handleDelete();
          }}>
          Retirer
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default PersonComponent;
