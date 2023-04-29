import { Avatar, Box, Button, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { changeTeacherPicture } from "../../redux/api/authApi";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { authActions } from "../../redux/slices/authSlice";
import SnackBar from "../../components/SnackBar";

function ProfilePicture(props) {
  const { user } = useSelector((state) => state.auth);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState("");
  const [typeSnackBar, setTypeSnackBar] = useState("");

  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(props.imageUrl);
  const [isImageChanged, setIsImageChanged] = useState(false);

  const baseUrl = "https://campusapi-gljq.onrender.com/images/";
  const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
  const fullUrl = baseUrl + filename;

  console.log(fullUrl);

  const { isLoading, mutate } = useMutation(
    (data) => {
      return changeTeacherPicture({ id: user._id, data, token: user.token });
    },
    {
      onSuccess: (data) => {
        dispatch(authActions.updateUser({ user: data.data.teacher }));
        setMessageSnackBar("Modification effectuée avec succès");
        setTypeSnackBar("success");
        setOpenSnackBar(true);
      },
      onError: (error) => {
        console.log(error.response.data.message);
      },
    }
  );

  const handleFileInputChange = (event) => {
    // Update the state with the selected file object
    const file = event.target.files[0];

    // Create a new FileReader object
    const reader = new FileReader();

    // Set up a callback function to run when the file is loaded
    reader.onloadend = () => {
      // Update the image URL in the state with the data URL of the loaded file
      setImageUrl(reader.result);
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);

    // Update the selectedFile state with the selected file object
    setSelectedFile(file);
    setIsImageChanged(true);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    mutate(formData);
  };

  if (isLoading) return <LoadingPage />;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SnackBar
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        message={messageSnackBar}
        type={typeSnackBar}
      />
      <input
        type="file"
        accept="image/*"
        id="icon-button-file"
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          sx={{
            width: "fit-content",
            height: "fit-content",
            padding: "6px",
            margin: "10px",
          }}
        >
          <Avatar
            alt={user.fullName}
            src={isImageChanged ? imageUrl : fullUrl}
            sx={{ width: 120, height: 120 }}
          />
          <PhotoCamera sx={{ fontSize: "1.8rem" }} />
        </IconButton>
      </label>
      {selectedFile && (
        <Button
          variant="contained"
          sx={{
            margin: "10px",
          }}
          style={{ textTransform: "none" }}
          onClick={handleUpload}
        >
          Modifier
        </Button>
      )}
    </Box>
  );
}

export default ProfilePicture;
