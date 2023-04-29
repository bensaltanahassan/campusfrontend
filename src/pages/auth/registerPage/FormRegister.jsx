import { Form, Formik } from "formik";
import Dropzone from "react-dropzone";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import * as yup from "yup";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useState } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Card,
  Stack,
} from "@mui/material";
import { useMutation } from "react-query";
import { signUp } from "../../../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import SnackBar from "../../../components/SnackBar";
import { useDispatch } from "react-redux";
import { authActions } from "../../../redux/slices/authSlice";
import OurCopyright from "../../../components/OurCopyright";
import { LoadingButton } from "@mui/lab";

const registerSchemaTeacher = yup.object().shape({
  fullName: yup.string().required("Obligatoire"),
  email: yup
    .string()
    .email("invalide email")
    .required("Email est obligatoire")
    .matches(
      /@uca\.ac\.ma$/,
      "Email doit contenir un domaine UCA (@uca.ac.ma)"
    ),
  picture: yup.string().required("Obligatoire"),
  password: yup
    .string()
    .required("Le mot de passe est obligatoire")
    .min(8, "Doit contenir au moins 8 caractères")
    .matches(/^(?=.*[a-z])/, "Doit contenir au moins une lettre minuscule")
    .matches(/^(?=.*[A-Z])/, "Doit contenir au moins une lettre majuscule")
    .matches(/^(?=.*[0-9])/, "Doit contenir au moins un chiffre")
    .matches(
      /^(?=.*[!@#$%^&*])/,
      "Doit contenir au moins un caractère spécial"
    ),
  verifyPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords doivent se ressambler")
    .required("Obligatoire"),
});

const registerSchemaStudent = yup.object().shape({
  fullName: yup.string().required("Obligatoire"),
  codeMassar: yup.string().required("Obligatoire"),
  cin: yup.string().required("Obligatoire"),
  phoneNumber: yup.number().positive().integer().required("Obligatoire"),
  password: yup
    .string()
    .required("Le mot de passe est obligatoire")
    .min(8, "Doit contenir au moins 8 caractères")
    .matches(/^(?=.*[a-z])/, "Doit contenir au moins une lettre minuscule")
    .matches(/^(?=.*[A-Z])/, "Doit contenir au moins une lettre majuscule")
    .matches(/^(?=.*[0-9])/, "Doit contenir au moins un chiffre")
    .matches(
      /^(?=.*[!@#$%^&*])/,
      "Doit contenir au moins un caractère spécial"
    ),
  verifyPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Obligatoire"),
});

const initialValuesRegisterTeacher = {
  fullName: "",
  email: "",
  picture: "",
  password: "",
  verifyPassword: "",
};

const initialValuesRegisterStudent = {
  fullName: "",
  codeMassar: "",
  cin: "",
  phoneNumber: "",
  password: "",
  verifyPassword: "",
};

function FormRegister() {
  const dispatch = useDispatch();
  const [userType, setUserType] = useState("");
  const [open, setOpen] = useState(false);
  const [eror, setEror] = useState("");
  const isTeacher = userType === "Teacher";
  const isStudent = userType === "Student";
  const [picture, setPicture] = useState(null);
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation(signUp, {
    mutationKey: "signUp",
    onSuccess: (data) => {
      dispatch(authActions.signUp({ user: data.data, userType: userType }));
      navigate("/auth/verifycode");
    },
    onError: (error) => {
      setEror(error.response.data.message);
      setOpen(true);
    },
  });

  const handleFormSubmit = (values, { setSubmitting }) => {
    if (isTeacher) {
      let formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("image", picture);
      mutate({ data: formData, userType });
    } else {
      const data = {
        fullName: values.fullName,
        codeMassar: values.codeMassar,
        cin: values.cin,
        phoneNumber: values.phoneNumber,
        password: values.password,
      };
      mutate({ data, userType });
    }
  };
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        mx: "auto",

        width: {
          xs: "100%",
          sm: "80%",
          md: "60%",
        },
      }}
    >
      <Box>
        <Card
          sx={{
            pl: 4,
            pr: 4,
            pt: 2,
            pb: 2,
          }}
        >
          <Formik
            initialValues={
              isTeacher
                ? initialValuesRegisterTeacher
                : initialValuesRegisterStudent
            }
            validationSchema={
              isTeacher ? registerSchemaTeacher : registerSchemaStudent
            }
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              setFieldValue,
              handleSubmit,
              resetForm,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Stack spacing={1}>
                  <Stack
                    sx={{
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        m: 1,
                        bgcolor: "secondary.main",
                      }}
                    >
                      <AssignmentIndIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      S'inscrire
                    </Typography>
                  </Stack>
                  <TextField
                    fullWidth
                    label="Nom complet"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.fullName}
                    name="fullName"
                    error={
                      Boolean(touched.fullName) && Boolean(errors.fullName)
                    }
                    helperText={touched.fullName && errors.fullName}
                  />
                  <FormControl>
                    <FormLabel>Profession</FormLabel>
                    <RadioGroup
                      row
                      onChange={(e) => {
                        setUserType(e.target.value);
                      }}
                    >
                      <FormControlLabel
                        value="Teacher"
                        control={<Radio />}
                        label="Professeur"
                      />
                      <FormControlLabel
                        value="Student"
                        control={<Radio />}
                        label="Etudiant"
                      />
                    </RadioGroup>
                  </FormControl>
                  {isTeacher && (
                    <Stack spacing={1}>
                      <TextField
                        fullWidth
                        label="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                      <Box
                        sx={{
                          border: "1px solid black",
                          borderRadius: "5px",
                          p: 2,
                        }}
                      >
                        <Dropzone
                          acceptedFiles=".jpg,.jpeg,.png"
                          multiple={false}
                          onDrop={(acceptedFiles) => {
                            setPicture(acceptedFiles[0]);
                            setFieldValue("picture", acceptedFiles[0]);
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <Box
                              {...getRootProps()}
                              border="2px dashed"
                              p="1rem"
                              sx={{
                                "&:hover": { cursor: "pointer" },
                              }}
                            >
                              <input {...getInputProps()} />
                              {values.picture ? (
                                <Typography>{values.picture.name}</Typography>
                              ) : (
                                <p>Choisir une photo</p>
                              )}
                            </Box>
                          )}
                        </Dropzone>
                      </Box>
                    </Stack>
                  )}
                  {isStudent && (
                    <Stack spacing={1}>
                      <Stack
                        direction={{
                          xs: "column",
                          sm: "row",
                        }}
                        spacing={1}
                      >
                        <TextField
                          label="Cin"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.cin}
                          name="cin"
                          error={Boolean(touched.cin) && Boolean(errors.cin)}
                          helperText={touched.cin && errors.cin}
                        />
                        <TextField
                          fullWidth
                          label="Code Massar"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.codeMassar}
                          name="codeMassar"
                          error={
                            Boolean(touched.massar) && Boolean(errors.massar)
                          }
                          helperText={touched.massar && errors.massar}
                        />
                      </Stack>
                      <TextField
                        label="Numéro de téléphone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phoneNumber}
                        name="phoneNumber"
                        error={
                          Boolean(touched.phoneNumber) &&
                          Boolean(errors.phoneNumber)
                        }
                        helperText={touched.phoneNumber && errors.phoneNumber}
                      />
                    </Stack>
                  )}
                  <Stack
                    spacing={1}
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                  >
                    <TextField
                      label="Mot de passe"
                      type="password"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      name="password"
                      error={
                        Boolean(touched.password) && Boolean(errors.password)
                      }
                      helperText={touched.password && errors.password}
                    />
                    <TextField
                      label="Cofirmer mot de passe"
                      type="password"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.verifyPassword}
                      name="verifyPassword"
                      error={
                        Boolean(touched.verifyPassword) &&
                        Boolean(errors.verifyPassword)
                      }
                      helperText={
                        touched.verifyPassword && errors.verifyPassword
                      }
                    />
                  </Stack>
                </Stack>
                <Stack>
                  <LoadingButton
                    loading={isLoading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isLoading}
                    sx={{ mt: 3, mb: 2, p: "0.5rem" }}
                  >
                    Se connecter
                  </LoadingButton>
                  <Link
                    variant="body2"
                    onClick={() => navigate("/auth/login")}
                    sx={{
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    Vous avez déja un compte ? Se Connecter
                  </Link>
                </Stack>
              </Form>
            )}
          </Formik>
        </Card>
        <OurCopyright />
      </Box>
      <SnackBar message={eror} open={open} setOpen={setOpen} />
    </Stack>
  );
}
export default FormRegister;
