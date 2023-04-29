import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BgHero from "../../static/images/bghero.jpg";
import { black, orange } from "../../utils/colors";
import AnimatedTextHeroSection from "./AnimatedTextHeroSection";

const styles = {
  demoWrap: {
    position: "relative",
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: `calc(100vh)`,
      opacity: { xs: 0.1, sm: 0.1, md: 0.3, lg: 1 },
      backgroundImage: `url(${BgHero})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 0",
      backgroundSize: "cover",
    },
  },
  demoContent: {
    position: "relative",
    width: { xs: "100%", sm: "100%", md: "50%", lg: "35%" },
    alignItems: { xs: "center", sm: "center", md: "start" },
    textAlign: { xs: "center", sm: "center", md: "start" },
    pt: 15,
  },
};

function HeroSectionHomePage() {
  const navigate = useNavigate();

  const handleClickSeConnect = (e) => {
    e.preventDefault();
    navigate("auth/login");
  };
  const handleClickSinscrire = (e) => {
    e.preventDefault();
    navigate("auth/register");
  };
  return (
    <Box component="div" sx={styles.demoWrap}>
      <Container>
        <Stack
          direction="column"
          spacing={1}
          sx={{
            ...styles.demoContent,
            // make items start from left and center horizontal
            justifyContent: { xs: "center", sm: "center", md: "center" },
            alignItems: { xs: "center", sm: "center", md: "start" },
            justifyItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: black, fontWeight: "bold", fontSize: 30 }}
          >
            Campus Numérique
          </Typography>
          <AnimatedTextHeroSection />

          <Typography
            variant="h6"
            sx={{
              lineHeight: 1.6,
              fontSize: 16,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Campus Numérique est la solution idéale pour les enseignants et les
            étudiants qui cherchent à explorer un monde d'apprentissage
            interactif et collaboratif en ligne
          </Typography>
          <Stack direction="row" pt={7}>
            <Box>
              <Button
                onClick={(e) => handleClickSeConnect(e)}
                sx={{ color: "white", mr: "14px" }}
                variant="contained"
              >
                Se Connecter
              </Button>
              <Button
                sx={{ color: "black", width: "120px" }}
                variant="outlined"
                onClick={(e) => handleClickSinscrire(e)}
              >
                S'inscrire
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default HeroSectionHomePage;
