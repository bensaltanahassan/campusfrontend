import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import { fr } from "date-fns/locale";
import { formatDistanceToNow, isBefore, subDays } from "date-fns";

const CommentsPubDetails = (props) => {
  const date = new Date(props.createdAt);
  const now = new Date();
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
    <Stack
      direction="row"
      sx={{
        backgroundColor: "#F8F8FB",
        borderRadius: "8px",
        justifyContent: "space-between",
        alignItems: "center",
        pt: 1,
        pb: 1,
        pr: 2,
        pl: 2,
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
        }}
      >
        <Avatar />

        <Stack>
          <Typography
            variant="p"
            sx={{
              fontWeight: "bold",
              color: "rgb(104,109,112)",
            }}
          >
            {props.name}
          </Typography>
          <Typography variant="p" color="rgb(104,109,112)">
            {props.content}
          </Typography>
        </Stack>
      </Stack>
      <Typography
        sx={{
          color: "rgb(104,109,112)",
          fontSize: "14px",
        }}
      >
        {formattedDate}
      </Typography>
    </Stack>
  );
};

export default CommentsPubDetails;
