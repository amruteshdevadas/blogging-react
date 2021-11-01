import { Box } from "@mui/system";
import React from "react";
import { Grid } from "@mui/material";
import NavBar from "./NavBar";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function UserProfile(props) {
  let id = props.match.params.id;
  const [user, setUser] = useState({});

  async function fetchList() {
    await axios
      .get(`https://blogging-b251-wd.herokuapp.com/authors/getUser/${id}`)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <>
      <NavBar data="Profile" />
      <Box ms={15} mx={15} mt={5}>
        <Grid
          item
          lg="12"
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <img
            width="100"
            src={
              user.avatar
                ? `${user.avatar}`
                : "https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049__340.png"
            }
          />
          <h3>Name: {user.userName}</h3>
          <p>
            {
              user.about ? user.about : ""
            }
          </p>
          <div></div>
        </Grid>
      </Box>
    </>
  );
}

export default UserProfile;
