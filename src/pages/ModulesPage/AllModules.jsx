import { Grid } from "@mui/material";
import React from "react";
import CardModule from "./CardModule";
import AddModule from "./AddModule";
import { useSelector } from "react-redux";
import RejoindreModule from "./RejoindreModule";

function AllModulesStudent(props) {
  const { userType } = useSelector((state) => state.auth);

  return (
    <Grid container spacing={2}>
      {props.modules.map((e, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <CardModule module={props.modules[index]} refetch={props.refetch} />
        </Grid>
      ))}

      <Grid item xs={12} sm={6} md={4} lg={3}>
        {userType === "Teacher" ? (
          <AddModule refetch={props.refetch} />
        ) : (
          <RejoindreModule />
        )}
      </Grid>
    </Grid>
  );
}

export default AllModulesStudent;
