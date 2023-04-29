import { Box, IconButton } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CustomDrarwer from "../../../components/CustomDrarwer";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function MenuButtonAppBar() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const location = useLocation();

  const isNavigateModule =
    location.pathname.split("/").includes("modules") &&
    location.pathname.split("/").length > 3;

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  return (
    <Box display={isNavigateModule ? "block" : "none"}>
      <IconButton
        onClick={() => {
          setOpenDrawer(true);
        }}
      >
        <MenuIcon sx={{ color: "white" }} />
      </IconButton>

      <CustomDrarwer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        handleOpenDrawer={handleOpenDrawer}
      />
    </Box>
  );
}

export default MenuButtonAppBar;
