import { Box, Toolbar } from "@mui/material";
import CustomDrarwer from "./CustomDrarwer";

function CustomPageWithDrawer({ children }) {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          <CustomDrarwer />
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </div>
  );
}

export default CustomPageWithDrawer;
