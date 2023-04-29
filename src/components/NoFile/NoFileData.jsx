import { Stack, Typography } from "@mui/material";
import React from "react";

import Lottie from "lottie-react";
import noData from "../../static/lotties/no-file.json";
import CustomPageWithDrawer from "../CustomPageWithDrawer";

function NoFileData() {
  return (
    <CustomPageWithDrawer>
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "50%",
        }}
      >
        <Lottie
          animationData={noData}
          loop={true}
          style={{ width: "100%", height: "60%" }}
        />
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "grey",
          }}
        >
          Il n'y a pas de fichiers pour le moment
        </Typography>
      </Stack>
    </CustomPageWithDrawer>
  );
}

export default NoFileData;
