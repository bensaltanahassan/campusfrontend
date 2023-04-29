import React from "react";
import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";
import CustomTableNotes from "./CustomTableNotes";

function NotesPage() {
  return (
    <CustomPageWithDrawer>
      <CustomTableNotes />
    </CustomPageWithDrawer>
  );
}

export default NotesPage;
