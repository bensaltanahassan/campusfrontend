import { Box, Divider } from "@mui/material";
import { Stack } from "@mui/system";
import CardAddPubBoard from "../../components/board/CardAddPubBoard";
import CardPubBoard from "../../components/board/CardPubBoard";
import CardTopPageBoard from "../../components/board/CardTopPageBoard";
import { useQuery } from "react-query";
import { getAllPubs } from "../../redux/api/pubApi";
import CustomPageWithDrawer from "../../components/CustomPageWithDrawer";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function BoardPage() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { userType } = useSelector((state) => state.auth);

  const { isLoading, data, refetch } = useQuery({
    queryKey: "getAllPubs",
    queryFn: () => getAllPubs(id, user.token),
  });

  if (isLoading) return <LoadingPage />;

  return (
    <CustomPageWithDrawer>
      <Box
        sx={{
          pb: 4,
        }}
      >
        <Stack direction={"column"}>
          <CardTopPageBoard />

          <Divider sx={{ height: 20 }} />

          <Stack
            sx={{
              display: userType === "Student" ? "none" : "block",
            }}
          >
            <CardAddPubBoard refetch={refetch} />

            <Divider sx={{ height: 20 }} />
          </Stack>

          {data.data.pubs.map((e, i) => {
            return (
              <Box key={i} mb={1}>
                <CardPubBoard pub={e} />
              </Box>
            );
          })}
        </Stack>
      </Box>
    </CustomPageWithDrawer>
  );
}

export default BoardPage;
