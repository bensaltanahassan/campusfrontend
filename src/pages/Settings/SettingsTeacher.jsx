import { Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomSettingRow from "./CustomSettingRow";
import { useDispatch, useSelector } from "react-redux";
import CustomModalSettings from "./CustomModalSettings";
import { useMutation } from "react-query";
import { updateTeacher } from "../../redux/api/authApi";
import { authActions } from "../../redux/slices/authSlice";
import SnackBar from "../../components/SnackBar";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import ProfilePicture from "./ProfilePicture";

const patternEmail = /^[a-zA-Z0-9._]+@uca\.ac\.ma$/;
const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

function SettingsTeacher() {
  const [openModalName, setOpenModalName] = useState(false);
  const [openModalEmail, setOpenModalEmail] = useState(false);
  const [openModalPassword, setOpenModalPassword] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState("");
  const [typeSnackBar, setTypeSnackBar] = useState("");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [values, setValues] = useState({
    fullName: user.fullName,
    email: user.email,
    password: "",
  });

  const { isLoading, mutate } = useMutation(
    (data) => {
      return updateTeacher({ id: user._id, data, token: user.token });
    },
    {
      onSuccess: (data) => {
        dispatch(authActions.updateUser({ user: data.data.teacher }));
        setOpenModalName(false);
        setOpenModalEmail(false);
        setOpenModalPassword(false);
        setMessageSnackBar("Modification effectuée avec succès");
        setTypeSnackBar("success");
        setOpenSnackBar(true);
      },
      onError: (error) => {
        setMessageSnackBar(error.response.data.message);
        setTypeSnackBar("error");
        setOpenSnackBar(true);
      },
    }
  );

  const handleOpenModalName = () => {
    setOpenModalName(true);
  };

  const handleOpenModalEmail = () => {
    setOpenModalEmail(true);
  };

  const handleOpenModalPassword = () => {
    setOpenModalPassword(true);
  };

  const handleSaveFullName = () => {
    if (values.fullName.length >= 3) {
      mutate({
        fullName: values.fullName,
      });
    }
  };

  const handleSaveEmail = () => {
    if (patternEmail.test(values.email)) {
      mutate({
        email: values.email,
      });
    }
  };

  const handleSavePassword = () => {
    if (patternPassword.test(values.password)) {
      mutate({
        password: values.password,
      });
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    <Stack>
      <SnackBar
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        message={messageSnackBar}
        type={typeSnackBar}
      />
      <Typography
        sx={{
          color: "#231942",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Paramètres
      </Typography>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <Stack>
        <ProfilePicture imageUrl={user.imageUrl} />
        <Divider sx={{ mt: 2, mb: 2 }} />

        <CustomSettingRow
          title="Nom Complet"
          buttonText="Modifier"
          value={user.fullName}
          onClick={handleOpenModalName}
        />
        <CustomModalSettings
          open={openModalName}
          setOpen={setOpenModalName}
          title="Modifier le nom"
          defaultValue={user.fullName}
          error={values.fullName.length < 3}
          onChange={(e) => {
            setValues({ ...values, fullName: e.target.value });
          }}
          helperText={
            values.fullName.length < 3
              ? "Le nom doit contenir au moins 3 caractères"
              : ""
          }
          label="Nom Complet"
          onSave={handleSaveFullName}
        />

        <Divider sx={{ mt: 2, mb: 2 }} />
        <CustomSettingRow
          title="Email"
          value={user.email}
          buttonText="Modifier"
          onClick={handleOpenModalEmail}
        />
        <CustomModalSettings
          type="email"
          label="Email"
          open={openModalEmail}
          setOpen={setOpenModalEmail}
          title="Modifier l'émail"
          defaultValue={user.email}
          onSave={handleSaveEmail}
          error={!patternEmail.test(values.email)}
          onChange={(e) => {
            setValues({ ...values, email: e.target.value });
          }}
          helperText={
            !patternEmail.test(values.email)
              ? "L'email doit être de la forme: xxxxx@uca.ac.ma"
              : ""
          }
        />

        <Divider sx={{ mt: 2, mb: 2 }} />
        <CustomSettingRow
          title="Mot de passe"
          buttonText="Modifier"
          onClick={handleOpenModalPassword}
        />
        <CustomModalSettings
          type="password"
          open={openModalPassword}
          setOpen={setOpenModalPassword}
          title="Modifier le mot de passe"
          label="Nouveau mot de passe"
          onSave={handleSavePassword}
          onChange={(e) => {
            setValues({ ...values, password: e.target.value });
          }}
          error={
            values.password.length < 8
              ? true
              : !patternPassword.test(values.password)
              ? true
              : false
          }
          helperText={
            values.password.length < 8
              ? "Le mot de passe doit contenir au moins 8 caractères"
              : !patternPassword.test(values.password)
              ? "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
              : ""
          }
        />
      </Stack>
    </Stack>
  );
}

export default SettingsTeacher;
