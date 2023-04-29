import {
  Badge,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useMutation, useQuery } from "react-query";
import {
  getNotifications,
  readNotification,
} from "../../../redux/api/notificationsApi";
import { useSelector } from "react-redux";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";

function NotificationIcon() {
  const { user } = useSelector((state) => state.auth);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  useQuery({
    queryKey: "getNotifications",
    queryFn: () => getNotifications(user.token),
    onSuccess: (data) => {
      setNotifications(data.data.notifications);
    },
    onError: (error) => {
      console.log(error);
    },
    // refetchInterval: 2000,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (e) => {
    navigate(e.page);
  };
  const [notificationId, setNotificationId] = useState(null);
  const { mutate } = useMutation({
    mutationKey: "readNotification",
    mutationFn: () => {
      // make the notifications.isRead to true

      return readNotification(notificationId, user.token);
    },
    onSuccess: (data) => {
      console.log(data.data);
    },
    onError: (err) => {
      console.log(err.message);
    },
  });
  const handleClickNotification = (e, key) => {
    setNotificationId(e._id);
    let newNotifications = [...notifications];
    newNotifications[key].isRead = true;
    setNotifications(newNotifications);
    mutate();
  };

  return (
    <div>
      <IconButton
        sx={{
          mt: 1.5,
          p: 0,
          color: "white",
        }}
        size="large"
        onClick={handleClick}
      >
        <Badge
          color="secondary"
          badgeContent={notifications.filter((e) => e.isRead === false).length}
        >
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            width: "400px",
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
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack spacing={1} divider={<Divider />} ml={1} mr={1}>
          {notifications.map((e, key) => (
            <Button
              key={key}
              onClick={() => {
                handleNavigation(e);
                handleClickNotification(e, key);
              }}
            >
              <Typography
                sx={{
                  textTransform: "none",
                  fontSize: "16px",
                  textAlign: "left",
                  color: e.isRead ? "text.secondary" : "text.primary",
                  "&:hover": {
                    backgroundColor: "primary.light",
                    color: "white",
                    cursor: "pointer",
                  },
                }}
              >
                {e.message}
              </Typography>
            </Button>
          ))}
        </Stack>
      </Menu>
    </div>
  );
}

export default NotificationIcon;
