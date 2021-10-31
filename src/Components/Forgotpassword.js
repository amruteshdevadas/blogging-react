import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import Message from './Message'

function Forgotpassword() {
  const [message, setMessage] = useState("");
  const [showMessage,setShowMessage] = useState(false)
  const [severity,setSeverity]=useState("error")
  const handleSubmit = async (e) => {
    try {
      await axios
        .post("https://blogging-b251-wd.herokuapp.com/authors/forgetPassword", { id: e.email })
        .then((response) => {
          console.log(response)
          setMessage(response.data)
          setShowMessage(true)
          setSeverity("success")
        });
    } catch (error) {
      console.log(error);
      setMessage("User Not Found..!")
      setShowMessage(true)
    }
  };

  const initialValues = { email: "" };

  const validationSchema = yup.object({
    email: yup
      .string("Enter your Email")
      .email("Enter Valid Email")
      .required("required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
    <Message showMessage={showMessage} message={message} severity={severity} />
    <form onSubmit={formik.handleSubmit}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
            <AssignmentIndIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Mail"
                  type="text"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </form>
    </>
  );
}

export default Forgotpassword;
