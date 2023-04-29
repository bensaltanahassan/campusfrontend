import React from "react";
import CustomPageWithoutDrawer from "../../components/CustomPageWithoutDrawer";
import { Card } from "@mui/material";
import { useSelector } from "react-redux";
import SettingsTeacher from "./SettingsTeacher";
import SettingsStudent from "./SettingsStudent";

function SettingsPage() {
  const { userType } = useSelector((state) => state.auth);
  return (
    <CustomPageWithoutDrawer>
      <Card
        sx={{
          width: "100%",
          padding: 2,
          border: "1px solid #eaeaea",
          borderRadius: "5px",
        }}
      >
        {userType === "Teacher" ? <SettingsTeacher /> : <SettingsStudent />}
      </Card>
    </CustomPageWithoutDrawer>
  );
}

export default SettingsPage;
