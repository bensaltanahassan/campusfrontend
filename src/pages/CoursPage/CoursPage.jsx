import { useParams } from "react-router-dom";
import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";
import { useSelector } from "react-redux";
import { getAllFiles } from "../../redux/api/pubApi";
import { useQuery } from "react-query";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import CustomCardFile from "../../components/Files/CustomCardFile";
import NoFileData from "../../components/NoFile/NoFileData";

function CoursPage() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const { isLoading } = useQuery({
    queryKey: "getAllFiles",
    queryFn: () => getAllFiles(id, user.token),
    onSuccess: (d) => {
      const filtered = d.data.files.filter((file) => file.type === "cours");
      setData(filtered);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (isLoading) return <LoadingPage />;

  if (!data.length) {
    return <NoFileData />;
  }

  return (
    <CustomPageWithDrawer>
      <Stack spacing={2}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
          }}
        >
          Les cours :
        </Typography>
        {data.map((file, i) => {
          return <CustomCardFile key={i} file={file} />;
        })}
      </Stack>
    </CustomPageWithDrawer>
  );
}

export default CoursPage;
