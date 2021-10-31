import React from "react";
import TopBar from "./TopBar";
import Header from "./Header";
import FeaturedPost from "./FeaturedPosts";
import { Grid } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Box } from "@mui/system";
import ImageList from './ImageList'
import ImageList1 from './ImageList1'

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchlist() {
      axios
        .get("https://blogging-b251-wd.herokuapp.com/post/getAllPosts", {
          headers: { authorization: window.localStorage.getItem("token") },
        })
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchlist();
  }, []);
  return (
    <>
      <TopBar />
      <Box ms={5}mx={5} mt={2}>
      <Header post={posts.slice(0,1)}/>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {posts ? (
          posts.slice(1,5).map((post) => <FeaturedPost key={post._id} post={post} />)
        ) : (
          <h2> No Posts Yet</h2>
        )}
        </Grid>
        <Grid 
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        >
         <ImageList post={posts.slice(6,10)} />
         <ImageList1 post ={posts.slice(11,16)}/>
         </Grid>
     
      </Box>
    </>
  );
}

export default HomePage;
