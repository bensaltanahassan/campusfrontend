import React from "react";
import CustomPageWithoutDrawer from "../../components/CustomPageWithoutDrawer";

function ErrorPage(props) {
  const { message } = props;
  return (
    <CustomPageWithoutDrawer>
      <h1>{message}</h1>
    </CustomPageWithoutDrawer>
  );
}

export default ErrorPage;
