import { TextField, Box, Card, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import { resetPassword } from "../../../redux/api/authApi";
import { LoadingButton } from "@mui/lab";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const { userType, user } = useSelector((state) => state.auth);

  const resetSchemaPassword = yup.object().shape({
    newPassword: yup
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
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("newPassword"), null],
        "Mots de passe doivent se ressambler"
      )
      .required("Obligatoire"),
  });

  const initialValuesPasswords = {
    newPassword: "",
    confirmPassword: "",
  };

  const { isLoading, mutate } = useMutation(resetPassword, {
    mutationKey: "resetPassword",

    onSuccess: (data) => {
      navigate("/auth/login", { replace: true });
    },
    onError: (error) => {},
  });

  const handleSubmit = (values) => {
    mutate({ newPassword: values.newPassword, userType, id: user._id });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          p: 4,
        }}
      >
        <Formik
          initialValues={initialValuesPasswords}
          validationSchema={resetSchemaPassword}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form>
              <Stack
                spacing={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#000",
                    textAlign: "center",
                  }}
                >
                  Veuillez entrer votre nouveau mot de passe
                </Typography>
                <TextField
                  label="Nouveau Mot de Passe"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fullWidth
                  value={values.newPassword}
                  name="newPassword"
                  error={
                    Boolean(touched.newPassword) && Boolean(errors.newPassword)
                  }
                  helperText={touched.newPassword && errors.newPassword}
                />
                <TextField
                  label="Confirmer Mot de Passe"
                  type="Password"
                  onBlur={handleBlur}
                  fullWidth
                  onChange={handleChange}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  error={
                    Boolean(touched.confirmPassword) &&
                    Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />

                <LoadingButton
                  loading={isLoading}
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  Change Mot de passe
                </LoadingButton>
              </Stack>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default ChangePasswordPage;
