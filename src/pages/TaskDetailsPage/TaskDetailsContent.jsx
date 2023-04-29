import React, { useState } from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import axios from "axios";

function TaskDetailsContent(props) {
  const [isDownloading, setIsDownloading] = useState(false);
  const handleClickDownload = async (event, file) => {
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
  const { task } = props;
  return (
    <TableContainer>
      <Table
        sx={{
          minWidth: 650,
        }}
      >
        <TableHead
          sx={{
            backgroundColor: "#f5f5f5",
          }}
        >
          <TableRow
            sx={{
              "& th": {
                fontWeight: "bold",
                border: "1px solid rgba(0, 0, 0, 0.23) !important",
                borderRadius: "4px",
              },
            }}
          >
            <TableCell>Fichier</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Debut</TableCell>
            <TableCell>Fin</TableCell>
            <TableCell>Bonus</TableCell>
            <TableCell>Penalty</TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            "& td": {
              border: "1px solid rgba(0, 0, 0, 0.23)",
              borderRadius: "4px",
            },
          }}
        >
          {task && (
            <TableRow>
              <TableCell>
                <Tooltip title="Télécharger le fichier">
                  <IconButton
                    sx={{
                      color: "red",
                      border: "1px solid rgba(0, 0, 0, 0.23)",
                      borderRadius: "4px",
                      mt: 1,
                      mb: 1,
                      width: "100%",
                    }}
                    onClick={(e) => {
                      handleClickDownload(e, task.file);
                    }}
                  >
                    <FileDownloadIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.debut}</TableCell>
              <TableCell>{task.fin}</TableCell>
              <TableCell>
                <Typography
                  sx={{
                    color: "green",
                  }}
                >
                  +{task.bonus} points
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    color: "red",
                  }}
                >
                  -{task.penalty} points
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaskDetailsContent;
