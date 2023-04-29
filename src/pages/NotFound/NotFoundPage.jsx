import CustomPageWithoutDrawer from "../../components/CustomPageWithoutDrawer";

import Lottie from "lottie-react";

import NotFoundAnimation from "../../static/lotties/notfound.json";
import { Typography } from "@mui/material";

function NotFoundPage() {
  return (
    <CustomPageWithoutDrawer>
      <Lottie
        animationData={NotFoundAnimation}
        style={{
          width: "100%",
          height: "400px",
        }}
        loop={true}
      />
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "14px",
          fontWeight: "bold",
          color: "grey",
        }}
      >
        Désolé, la page que vous recherchez est introuvable. Nous vous invitons
        à vérifier l'URL ou à retourner sur la page d'accueil pour continuer
        votre navigation.
      </Typography>
    </CustomPageWithoutDrawer>
  );
}

export default NotFoundPage;
