import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import NavBar from "./NavBar";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect } from "react";
import Message from './Message'

function Settings() {
  const [formvalues, setFormvalues] = useState({
    userName: "",
    avatar:"",
    about:""
  });
  const [file, setFile] = useState(null);
  const [message,setMessage] = useState("")
  const [login, setLogin] =useState(false)
  const [openMessage,setOpenMessage]=useState(false)
  const [severity,setSeverity] = useState('error')
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({
      ...formvalues,
      [name]: value,
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    await axios
      .get("https://blogging-b251-wd.herokuapp.com/authors/getUser", {
        headers: { authorization: window.localStorage.getItem("token") },
      })
      .then((response) => {
        setFormvalues(response.data);
        setFile(response.data.avatar)
        setLogin(true)
      })
      .catch((error) => {
        console.log(error);
        setMessage("Please Login")
        setOpenMessage(true)
      });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userName",formvalues.userName)
    formData.append("about",formvalues.about)
    await axios
      .post("https://blogging-b251-wd.herokuapp.com/authors/settings", formData, {
        headers: {
          authorization: window.localStorage.getItem("token"),
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        setOpenMessage(true)
        setMessage("Updated Successfully")
        setSeverity('success')
        fetchList()
      })
      .catch((error) => {
        console.log(error);
        
      });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <>
      <NavBar data="Settings Page" />
      <Message message={message} showMessage={openMessage} severity={severity}/>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            "& .MuiTextField-root": { mt: 3, width: "45ch" },
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            { login ? 
            <>
            <img src={formvalues.avatar} name="avatar" width="100"/>
            <TextField
              name="userName"
              label="UserName"
              variant="outlined"
              value={formvalues.userName}
              onChange={handleChange}
            />
        
            <TextField name="about" label="About" variant="outlined" value={formvalues.about} onChange={handleChange} multiline rows={3}/>
            <Box mt={2}>
            <label htmlFor="avatar">Edit your image (Max 1MB only JPEG Or Png.) </label>
            <br/>
            <input type="file" name="avatar" onChange={handleFileChange}/>
            </Box>
            
            <Box mt={2}>
              <Button variant="contained" type="submit">
                Update
              </Button>
            </Box>
            </>
              : ""
}
          </Grid>
        </Box>
      </form>
    </>
  );
}

export default Settings;
