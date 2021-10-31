import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { Grid } from "@mui/material";
import FeaturedPosts from "./FeaturedPosts";
import { Button } from "@mui/material";
import Message from './Message'

function UserPosts() {
  const [myPosts, setMyPosts] = useState([]);
  const [message,setMessage] = useState("")
  const [showMessage,setShowMessage]=useState(false)
  const [severity,setSeverity] = useState('error')
  const [login,setLogin ] = useState(false)
  async function fetchList(){
    try {
      await axios
        .get("https://blogging-b251-wd.herokuapp.com/post/myposts", {
          headers: { authorization: window.localStorage.getItem("token") },
        })
        .then((response) => {
          console.log(response.data);
          setMyPosts(response.data);
          setLogin(true)
        });
    } catch (error) {
      console.log(error);
      setShowMessage(true)
      setMessage("Please Login")
    }
   }
  useEffect(() => {
    fetchList()
  }, []);
  return (
    <div>
      <NavBar data="My Posts" mb={2} />
      <Message showMessage={showMessage} severity={severity} message={message} />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        mt={5}
      >
        {login ? (
          
            myPosts.length >0 ?
            myPosts.map((post) => {
              return (
                <FeaturedPosts key={post.title} post={post} editData={true} />
              );
            }) : 
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <h1> No Posts Yet </h1>
          </Grid>
          
        ) : (
          " "
        )}
      </Grid>
      {  login ? 
       <Grid
       container
       direction="row"
       justifyContent="center"
       alignItems="center"
     >
       <Button href="/createPost" variant={"contained"}>
         Add New Story.?
       </Button>
     </Grid> :""

      }
     
    </div>
  );
}

export default UserPosts;
