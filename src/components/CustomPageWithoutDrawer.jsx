import { Box, Toolbar } from "@mui/material";

function CustomPageWithoutDrawer({ children }) {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </div>
  );
}

export default CustomPageWithoutDrawer;
