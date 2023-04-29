import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from "@mui/material";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import BuildIcon from "@mui/icons-material/Build";
import ListIcon from "@mui/icons-material/List";
import TableChartIcon from "@mui/icons-material/TableChart";
import AppsIcon from "@mui/icons-material/Apps";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MessageIcon from "@mui/icons-material/Message";
import GroupIcon from "@mui/icons-material/Group";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { primaryColor } from "../utils/colors";

let allSections = [
  {
    title: "Boards",
    url: "boards",
    icon: <InboxIcon />,
  },
  {
    title: "Etudiants",
    url: "etudiants",
    icon: <GroupIcon />,
  },
  {
    title: "Invitations",
    url: "invitations",
    icon: <GroupAddIcon />,
  },
  {
    title: "Cours",
    url: "cours",
    icon: <ListIcon />,
  },
  {
    title: "TDS",
    url: "tds",
    icon: <TableChartIcon />,
  },
  {
    title: "TPS",
    url: "tps",
    icon: <BuildIcon />,
  },
  {
    title: "Exams",
    url: "exams",
    icon: <InsertChartOutlinedIcon />,
  },
  {
    title: "Tâches",
    url: "tasks",
    icon: <AssignmentIcon />,
  },
  {
    title: "Messages",
    url: "messages",
    icon: <MessageIcon />,
  },
  {
    title: "Notes",
    url: "notes",
    icon: <AppsIcon />,
  },
  {
    title: "Statistiques",
    url: "statistiques",
    icon: <EqualizerIcon />,
  },
];

const drawerWidth = 210;

function CustomDrarwer(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const { userType } = useSelector((state) => state.auth);
  const [sections, setSections] = useState([]);

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (userType === "Student") {
      setSections(
        allSections.filter(
          (e) =>
            e.title !== "Statistiques" &&
            e.title !== "Notes" &&
            e.title !== "Invitations"
        )
      );
    } else {
      setSections(allSections);
    }
  }, [userType]);

  const handleClick = (url) => {
    const pathArray = location.pathname.split("/");
    pathArray.pop();
    // if he is finished by boards or messages or tasks then pop again
    if (
      pathArray[pathArray.length - 1] === "boards" ||
      pathArray[pathArray.length - 1] === "messages" ||
      pathArray[pathArray.length - 1] === "tasks"
    ) {
      pathArray.pop();
    }
    pathArray.push(url);
    navigate(pathArray.join("/"));

    if (isSmallScreen) props.setOpenDrawer(false);
  };

  const handleCloseDrawer = () => {
    props.setOpenDrawer(false);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
        // disable the line in the right of drawer
        "& .MuiDrawer-paperAnchorDockedLeft": {
          borderRight: "none",
        },

        display: isSmallScreen
          ? props.openDrawer
            ? "block"
            : "none"
          : "block",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          px: [1],
          backgroundColor: primaryColor,
        }}
      >
        <IconButton
          onClick={handleCloseDrawer}
          sx={{
            display: {
              xs: "flex",
              sm: "none",
              color: "white",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Box sx={{ overflow: "auto" }}>
        <List>
          {sections.map((e, index) => (
            <ListItem
              key={index}
              sx={{
                backgroundColor: location.pathname.includes(e.url)
                  ? "grey.300"
                  : "",
              }}
            >
              <ListItemButton
                selected={location.pathname === e.url}
                onClick={() => handleClick(e.url)}
              >
                <ListItemIcon>{e.icon}</ListItemIcon>
                <ListItemText primary={e.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default CustomDrarwer;
