import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { Grid, TextField } from "@mui/material";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { useHistory } from "react-router";
function EditPost(props) {
  
  let history = useHistory()
  const [message, setMessage] = useState("");
  let id = props.match.params.id
  
  useEffect(() => {
    async function fetchList() {
      await axios
        .get("https://blogging-b251-wd.herokuapp.com/post/getPost", {
          headers: {
            id:id,
            authorization: window.localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setFormvalues(response.data.post); 
        })
        .catch((error)=>{
          console.log(error)
        })
    }
    fetchList();
  }, []);

  const [formValues, setFormvalues] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(
        "https://blogging-b251-wd.herokuapp.com/post/editPost",
        { id: props.match.params.id, editedPost: formValues },
        { headers: { authorization: window.localStorage.getItem("token") } }
      )
      .then((response) => {
        setMessage(response.data);
        history.push('/userPosts')
      })
      .catch((response) => {
        setMessage(response.data);
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <NavBar data="Edit Post" />
        <Box m={15}>
          <Grid
            item
            lg="12"
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <TextField
              id="outlined-multiline-flexible"
              label="Title"
              multiline
              maxRows={2}
              value={formValues.title}
              onChange={handleChange}
              name="title"
              fullWidth
            />
            <TextField
              id="outlined-multiline-flexible"
              placeholder="Enter your Image URL"
              value={formValues.image}
              onChange={handleChange}
              name="image"
              fullWidth
            />

            <TextField
              id="outlined-textarea"
              placeholder="Enter your Content here"
              multiline
              onChange={handleChange}
              value={formValues.content}
              name="content"
              rows={12}
              fullWidth
            />
            <Box mt={2}>
              <Button type="submit" variant="contained">
                Publish
              </Button>
            </Box>
          </Grid>
          {message}
        </Box>
      </form>
    </>
  );
}

export default EditPost;
