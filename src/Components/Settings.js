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
  
  const [selectedFile, setSelectedFile] = useState('');
  const [fileInputState, setFileInputState] = useState('');
  const [message,setMessage] = useState("")
  const [login, setLogin] =useState(false)
  const [openMessage,setOpenMessage]=useState(false)
  const [severity,setSeverity] = useState('error')
  const [previewSource, setPreviewSource] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({
      ...formvalues,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(file)
    {
      setSelectedFile(file);
      previewFile(file);
      setFileInputState(e.target.value);
    }   
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
        setLogin(true)
      })
      .catch((error) => {
        console.log(error);
        setMessage("Please Login")
        setOpenMessage(true)
      });
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setPreviewSource(reader.result);
    };
};

  const handleSubmit = async (e) => {
    e.preventDefault();
        if (selectedFile) 
        {
          const reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend = () => {
              uploadImage(reader.result);
          };
          reader.onerror = () => {
              setMessage('something went wrong!');
              setOpenMessage(true)
          };
        }
        else{
          uploadImage(null)
        }
  };

  const uploadImage = async (base64EncodedImage) => {
    const userData={
        avatar:base64EncodedImage,
        userName:formvalues.userName,
        about :formvalues.about
      }
  
          await axios
            .post("https://blogging-b251-wd.herokuapp.com/authors/settings", {data:userData},{
              headers: {
                authorization: window.localStorage.getItem("token"),
                "Content-type": "application/json",
              }
            })
            .then((response) => {
              setOpenMessage(true)
              setMessage(response.data)
              setSeverity('success')
              fetchList()
              setPreviewSource(null)
            })
            .catch((error) => {
              console.log(error);
              
            });
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
            <input type="file" 
            name="avatar" 
            onChange={handleFileChange}
            value={fileInputState}
            />
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
        {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
      </form>
    </>
  );
}

export default Settings;
