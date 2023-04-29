import { Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomSettingRow from "./CustomSettingRow";
import { useDispatch, useSelector } from "react-redux";
import CustomModalSettings from "./CustomModalSettings";
import { useMutation } from "react-query";
import { updateStudent } from "../../redux/api/authApi";
import { authActions } from "../../redux/slices/authSlice";
import SnackBar from "../../components/SnackBar";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

function SettingsStudent() {
  const [openModalName, setOpenModalName] = useState(false);
  const [openModalCin, setOpenModalCin] = useState(false);
  const [openModalCodeMassar, setOpenModalCodeMassar] = useState(false);
  const [openModalPhoneNumber, setOpenModalPhoneNumber] = useState(false);
  const [openModalPassword, setOpenModalPassword] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState("");
  const [typeSnackBar, setTypeSnackBar] = useState("");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [values, setValues] = useState({
    fullName: user.fullName,
    cin: user.cin,
    codeMassar: user.codeMassar,
    phoneNumber: user.phoneNumber,
    password: "",
  });

  const { isLoading, mutate } = useMutation(
    (data) => {
      return updateStudent({ id: user._id, data, token: user.token });
    },
    {
      onSuccess: (data) => {
        dispatch(authActions.updateUser({ user: data.data.student }));
        setOpenModalName(false);
        setOpenModalPassword(false);
        setOpenModalCodeMassar(false);
        setOpenModalCin(false);
        setOpenModalPhoneNumber(false);

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

  const handleOpenModalCin = () => {
    setOpenModalCin(true);
  };

  const handleOpenModalCodeMassar = () => {
    setOpenModalCodeMassar(true);
  };

  const handleOpenModalPhoneNumber = () => {
    setOpenModalPhoneNumber(true);
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

  const handleSaveCin = () => {
    if (values.cin.length >= 3) {
      mutate({
        cin: values.cin,
      });
    }
  };

  const handleSaveCodeMassar = () => {
    if (values.codeMassar.length >= 3) {
      mutate({
        codeMassar: values.codeMassar,
      });
    }
  };

  const handleSavePhoneNumber = () => {
    if (values.phoneNumber.length >= 10) {
      mutate({
        phoneNumber: values.phoneNumber,
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
          title="Cin"
          value={user.cin}
          buttonText="Modifier"
          onClick={handleOpenModalCin}
        />
        <CustomModalSettings
          type="cin"
          label="Cin"
          open={openModalCin}
          setOpen={setOpenModalCin}
          title="Modifier Cin"
          defaultValue={user.cin}
          onSave={handleSaveCin}
          error={values.cin.length < 3}
          onChange={(e) => {
            setValues({ ...values, cin: e.target.value });
          }}
          helperText={
            values.cin.length < 3
              ? "Le cin doit contenir au moins 3 caractères"
              : ""
          }
        />

        <Divider sx={{ mt: 2, mb: 2 }} />
        <CustomSettingRow
          title="Code Massar"
          value={user.codeMassar}
          buttonText="Modifier"
          onClick={handleOpenModalCodeMassar}
        />
        <CustomModalSettings
          type="codeMassar"
          label="Code Massar"
          open={openModalCodeMassar}
          setOpen={setOpenModalCodeMassar}
          title="Modifier Code Massar"
          defaultValue={user.codeMassar}
          onSave={handleSaveCodeMassar}
          error={values.codeMassar.length < 3}
          onChange={(e) => {
            setValues({ ...values, codeMassar: e.target.value });
          }}
          helperText={
            values.codeMassar.length < 3
              ? "Le code massar doit contenir au moins 3 caractères"
              : ""
          }
        />

        <Divider sx={{ mt: 2, mb: 2 }} />
        <CustomSettingRow
          title="Nemuro de telephone"
          value={user.phoneNumber}
          buttonText="Modifier"
          onClick={handleOpenModalPhoneNumber}
        />
        <CustomModalSettings
          type="phone"
          label="Nemuro de telephone"
          open={openModalPhoneNumber}
          setOpen={setOpenModalPhoneNumber}
          title="Modifier Nemuro de telephone"
          defaultValue={user.phoneNumber}
          onSave={handleSavePhoneNumber}
          error={values.phoneNumber.length < 3}
          onChange={(e) => {
            setValues({ ...values, phoneNumber: e.target.value });
          }}
          helperText={
            values.phoneNumber.length < 10
              ? "Le nemuro de telephone doit contenir au moins 10 caractères"
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

export default SettingsStudent;
