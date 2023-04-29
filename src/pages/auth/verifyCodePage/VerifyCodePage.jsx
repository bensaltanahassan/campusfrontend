import { Box, Divider, Card, TextField, Stack, Button } from "@mui/material";
import * as yup from "yup";
import React from "react";
import { useMutation } from "react-query";
import { Form, Formik } from "formik";
import { resendCode, verifyCode } from "../../../redux/api/authApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SnackBar from "../../../components/SnackBar";
import { LoadingButton } from "@mui/lab";

const initialValues = {
  verifyCode: "",
};
const validateSchema = yup.object().shape({
  verifyCode: yup
    .number("Le code de vérification doit être un nombre")
    .required("Entrer votre code de vérification"),
});

function VerifyCodePage() {
  const userType = useSelector((state) => state.auth.userType);
  const user = useSelector((state) => state.auth.user);
  const verificationType = useSelector((state) => state.auth.verificationType);

  const isTeacher = userType === "Teacher";

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [typeSnackBar, setTypeSnackBar] = useState("error");

  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation(verifyCode, {
    mutationKey: "verifyCode",
    onSuccess: (data) => {
      if (verificationType === "signUp") {
        navigate("/auth/login", { replace: true });
      } else {
        navigate("/auth/changepassword", { replace: true });
      }
    },
    onError: (error) => {
      setMessage(error.response.data.message);
      setTypeSnackBar("error");
      setOpen(true);
    },
  });

  const { isLoading: loadingResendCode, mutate: mutateResendCode } =
    useMutation({
      mutationKey: "verifyCode",
      mutationFn: (receive) => {
        return resendCode(receive, userType);
      },

      onSuccess: (data) => {
        setMessage("Votre code de vérification a été renvoyé");
        setTypeSnackBar("success");
        setOpen(true);
      },
      onError: (error) => {
        setMessage(error.response.data.message);
        setTypeSnackBar("error");
        setOpen(true);
      },
    });

  const handleSubmit = (values) => {
    let _id = user._id;
    mutate({ ...values, userType, _id });
  };

  const handleResendCode = () => {
    if (userType === "Teacher") {
      mutateResendCode(user.email);
    } else {
      mutateResendCode(user.phoneNumber);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Card
          sx={{
            padding: "20px",
          }}
        >
          <h1>Entrer votre code de sécurité.</h1>
          <Divider />
          <p>
            Merci de vérifier que vous avez reçu un message avec votre.
            <br /> Celui-ci est composé de 5 chiffres.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validateSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <Form>
                <Stack
                  direction="row"
                  spacing={2}
                  mt={2}
                  sx={{
                    display: "flex",
                  }}
                >
                  <TextField
                    fullWidth
                    type="verifyCode"
                    name="verifyCode"
                    label="Code de vérification"
                    value={values.verifyCode}
                    error={errors.verifyCode && touched.verifyCode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={errors.verifyCode}
                  />
                  <p>
                    Nous avons envoyer votre code à:
                    {isTeacher ? (
                      <b> {user.email}</b>
                    ) : (
                      <b> {user.phoneNumber}</b>
                    )}
                    <br />
                    <br /> Celui-ci est composé de 5 chiffres.
                  </p>
                </Stack>
                <Divider />
                <Stack
                  direction="row"
                  spacing={2}
                  mt={2}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <LoadingButton
                    loading={loadingResendCode}
                    variant="text"
                    onClick={handleResendCode}
                    sx={{
                      textTransform: "none",
                      fontSize: "16px",
                    }}
                  >
                    Renvoyer le code
                  </LoadingButton>
                  <Stack
                    direction="row"
                    spacing={2}
                    mt={2}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Annuler
                    </Button>
                    <LoadingButton
                      loading={isLoading}
                      variant="contained"
                      color="primary"
                      disabled={isLoading || !values.verifyCode}
                      type="submit"
                      onSubmit={handleSubmit}
                    >
                      Continuer
                    </LoadingButton>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Card>
      </Box>
      <SnackBar
        message={message}
        open={open}
        setOpen={setOpen}
        type={typeSnackBar}
      />
    </>
  );
}

export default VerifyCodePage;
