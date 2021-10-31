import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import Message from './Message'

function Register() {
  let history = useHistory();

  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const handleSubmit = async (e) => {
    let author = {
      _id: e.email,
      userName: e.userName,
      password: e.password,
    };
    await axios
      .post("https://blogging-b251-wd.herokuapp.com/authors/register", { author })
      .then((response) => {
        if (response.status === 200) {
          setMessage("Successfully Registered");
          setShowMessage(true);
        }
        setTimeout(() => {
          history.push("/login");
        }, 1000);
      })
      .catch((error)=>{
        console.log(error)
          setMessage("Registration Failed..!!")
          setShowMessage(true)
      })
    
  };

  const initialValues = {
    userName: "",
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    userName: yup
      .string()
      .required("Please Enter User Name")
      .max(15, "max of 15 characters length")
      .min(3, "min of 3 characters length"),

    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(4, "mini 4 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
    <Message message={message} showMessage={showMessage}/>
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
            Sign up
          </Typography>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container item xs={12} mb={3}>
              <TextField
                //   autoComplete="fname"
                name="userName"
                fullWidth
                id="userName"
                label="User Name"
                value={formik.values.userName}
                onChange={formik.handleChange}
                error={
                  formik.touched.userName && Boolean(formik.errors.userName)
                }
                helperText={formik.touched.userName && formik.errors.userName}
              />
            </Grid>

            <Grid item xs={12} mb={3}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} mb={3}>
              <TextField
                fullWidth
                id="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </form>
    </>
  );
}

export default Register;
