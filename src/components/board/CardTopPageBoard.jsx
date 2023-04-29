import { Box, Card, Typography } from "@mui/material";
import React, { useEffect } from "react";
import R1 from "../../static/images/r1.jpg";
import R2 from "../../static/images/r2.jpg";
import R3 from "../../static/images/r3.jpg";

import { useSelector } from "react-redux";
import { getModuleInfo } from "../../redux/api/moduleApi";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import LoadingPage from "../LoadingPage/LoadingPage";

const randomNumber = Math.floor(Math.random() * 3);

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
      opacity: 0.08,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 0",
      backgroundSize: "cover",
    },
  },
  demoContent: {
    position: "relative",
  },
};

function CardTopPageBoard() {
  // const module = useSelector((state) => state.module.module);
  const [moduleName, setModuleName] = React.useState("");

  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const { isLoading, refetch } = useQuery({
    queryKey: "getModuleInfo",
    queryFn: () => getModuleInfo(id, user.token),
    onSuccess: (data) => {
      setModuleName(data.data.module.name);
    },
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <LoadingPage />;

  switch (randomNumber) {
    case 0:
      styles.demoWrap["&:before"].backgroundImage = `url(${R1})`;
      break;
    case 1:
      styles.demoWrap["&:before"].backgroundImage = `url(${R2})`;
      break;
    case 2:
      styles.demoWrap["&:before"].backgroundImage = `url(${R3})`;
      break;
    default:
      styles.demoWrap["&:before"].backgroundImage = `url(${R1})`;
  }
  return (
    <Card
      sx={{
        backgroundColor: "rgba(138, 43, 226, 0.6)",
        height: "230px",
        width: "100%",
        p: 2,
        ...styles.demoWrap,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          justifyContent: "flex-end",
          ...styles.demoContent,
        }}
      >
        <Typography variant="h3" sx={{ color: "white", pb: 2 }}>
          {moduleName}
        </Typography>
      </Box>
    </Card>
  );
}

export default CardTopPageBoard;
