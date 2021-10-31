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
import { useHistory } from "react-router";
import { useState } from "react";
import Message from './Message'

function ChangePassword(props) {
  let history = useHistory();
  const [message,setMessage] = useState("")
  const [showMessage,setShowMessage] = useState(false)
  const [severity,setSeverity]=useState("error")

  const handleSubmit = async (e) => {
    let url = props.match.url;
    try {
      // console.log("sending request")
      console.log(`${url}`)
      await axios.post(`https://blogging-b251-wd.herokuapp.com${url}`, { password: e.password }).then((response) => {
        console.log(response.data.message)
        setMessage(response.data.message)
        setShowMessage(true)
        setSeverity("success")
          setTimeout(() => {
            history.push("/login");
          }, 1000);    
      });
    } catch (error) {
      console.log(error);
      setMessage("Something went Wrong..")
      setShowMessage(true)
    }
  };
  const initialValues = { password: "" };

  const validationSchema = yup.object({
    password: yup
      .string("Enter your password")
      .min(5, "min 5")
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
            Reset Password
          </Typography>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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

export default ChangePassword;
