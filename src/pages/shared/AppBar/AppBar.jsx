import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { primaryColor } from "../../../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../redux/slices/authSlice";
import { Stack } from "@mui/material";
import NotificationIcon from "./NotificationIcon";
import Logo from "../../../static/images/logo192.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuButtonAppBar from "./MenuIcon";

const settings = [
  { setting: "Paramètres", route: "settings" },
  { setting: "Se déconnecter", route: "Logout" },
];

function MyAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const location = useLocation();

  // get the user from store
  const { user, isLogin, userType } = useSelector((state) => state.auth);

  const baseUrl = "https://campusapi-gljq.onrender.com/images/";

  const [fileName, setFileName] = React.useState(null);
  const [fullUrl, setFullUrl] = React.useState(null);

  React.useEffect(() => {
    if (userType === "Teacher") {
      setFileName(user.imageUrl.substring(user.imageUrl.lastIndexOf("/") + 1));
      setFullUrl(baseUrl + fileName);
    }
  }, [userType, fileName, baseUrl, fullUrl]);

  const isSmallScreen = useMediaQuery("(max-width:620px)");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleGoToRoute = (e, page) => {
    e.preventDefault();
    navigate(page);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  const handleGoToSettings = () => {
    navigate("settings");
  };

  // check if location.pathname contains "auth"
  const isAuthRoute = location.pathname.includes("auth");

  return (
    <AppBar
      position={isAuthRoute ? "static" : "fixed"}
      sx={{
        backgroundColor: primaryColor,
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {isSmallScreen && isLogin && <MenuButtonAppBar />}

          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
            }}
          >
            <Avatar src={Logo} sx={{ width: 40, height: 40 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
                display: isSmallScreen && "none",
              }}
            >
              Campus Numérique
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 0 }}>
            {!isLogin && (
              <Stack direction="row" spacing={2}>
                <Button
                  sx={{ color: "white" }}
                  variant="contained"
                  onClick={(e) => {
                    handleGoToRoute(e, "auth/login");
                  }}
                >
                  Se Connecter
                </Button>
                <Button
                  sx={{ color: "white" }}
                  variant="outlined"
                  onClick={(e) => {
                    handleGoToRoute(e, "auth/register");
                  }}
                >
                  S'inscrire
                </Button>
              </Stack>
            )}

            {isLogin === true && (
              <Stack direction="row" spacing={2}>
                <NotificationIcon />
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.fullName}
                      src={userType === "Teacher" ? fullUrl : null}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.setting}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (setting.route === "Logout") {
                          handleLogout();
                        }
                        if (setting.route === "settings") {
                          handleGoToSettings();
                        }
                      }}
                    >
                      <Typography textAlign="center">
                        {setting.setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Stack>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MyAppBar;
