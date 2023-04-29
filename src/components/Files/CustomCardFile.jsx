import { Avatar, Box, Card, Icon, Stack, Typography } from "@mui/material";
import Paper from "@mui/icons-material/StickyNote2Outlined";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow, isBefore, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useState } from "react";
import axios from "axios";

function CustomCardFile(props) {
  const navigate = useNavigate();

  const file = props.file;
  console.log(file);

  const date = new Date(file.createdAt);
  const now = new Date();

  const [isDownloading, setIsDownloading] = useState(false);

  const handleClickDownload = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isDownloading) {
      setIsDownloading(true);

      try {
        console.log("download");
        const response = await axios.get(
          `https://campusapi-gljq.onrender.com/files/download/${file._id}`,
          {
            responseType: "blob",
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file.name);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.log(error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  let formattedDate;

  if (isBefore(date, subDays(now, 1))) {
    formattedDate = date.toLocaleDateString("fr-FR");
  } else {
    formattedDate = formatDistanceToNow(date, {
      addSuffix: true,
      locale: fr,
    });
  }

  return (
    <Card
      sx={{
        pr: 2,
        pl: 2,
        pt: 1.3,
        pb: 1.3,
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row">
          <Avatar
            sx={{
              mr: 2,
              backgroundColor: "blueviolet",
            }}
          >
            <Paper />
          </Avatar>
          <Stack>
            <Typography
              sx={{
                fontSize: "1rem",
                color: "black",
              }}
            >
              {file.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.8rem",
                color: "grey",
              }}
            >
              {formattedDate}
            </Typography>
          </Stack>
        </Stack>
        {file && (
          <Box
            onClick={handleClickDownload}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: isDownloading ? "not-allowed" : "pointer",
              opacity: isDownloading ? 0.5 : 1,
            }}
          >
            <Icon
              sx={{
                color: "grey",
                "&:hover": {
                  color: "black",
                },
              }}
            >
              <FileDownloadIcon />
            </Icon>
          </Box>
        )}
      </Stack>
    </Card>
  );
}

export default CustomCardFile;
