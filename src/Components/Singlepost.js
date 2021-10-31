import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Comment } from "@mui/icons-material";
import { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Badge } from "@mui/material";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
function Singlepost(props) {
  const [singlePost, setSinglePost] = useState({
    title:"",
    content:"",
    author:"",
    createdAt:"",
    image:"",
  });
  const [showComment, setShowComment] = useState(false);

  const [formValues, setFormValues] = useState({
    comment: "",
  });

  async function fetchList() {
    await axios
      .get("https://blogging-b251-wd.herokuapp.com/post/getPost", {
        headers: {
          id: props.match.params.id,
          authorization: window.localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setSinglePost(response.data.post);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchList();
  }, []);

  const handleLike = async (e) => {
    await axios
      .post(
        "https://blogging-b251-wd.herokuapp.com/post/likePost",
        { id: props.match.params.id },
        {
          headers: { authorization: window.localStorage.getItem("token") },
        }
      )
      .then((response) => {
        console.log(response.data.post);
        if (response.status !== 200) {
          window.alert("Please Login");
        }
        fetchList();
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          window.alert("Please Login");
        }
      });
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    // console.log(formValues);
    await axios
      .post(
        "https://blogging-b251-wd.herokuapp.com/post/commentPost",
        { id: props.match.params.id, comment: formValues.comment },
        {
          headers: { authorization: window.localStorage.getItem("token") },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.status !== 200) {
          window.alert("Please Login.");
        }
        fetchList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ [name]: value });
  };

  const handleComment = (e) => {
    setShowComment(!showComment);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -4,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  return (
    <>
      <NavBar data={singlePost.title} />

      <Box mt={5} ms={10} mx={10}>
        <h1>{singlePost.title} </h1>
        <Link to={`/userProfile/${singlePost.author}`}>
          {" "}
          <h3>Author :{singlePost.author}</h3>
        </Link>
        <h5>{singlePost.createdAt.substring(4,15)}</h5>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <img width="400" height="450" src={singlePost.image} alt="Text"></img>
        </Grid>

        <h4>{parse(singlePost.content)}</h4>
        <p>Likes and Comments</p>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <IconButton>
            <StyledBadge
              color="secondary"
              badgeContent={singlePost.likes ? singlePost.likes.length : 0}
            >
              <ThumbUpIcon onClick={handleLike} style={{ padding: "0 8px" }} />
            </StyledBadge>
          </IconButton>
          <IconButton>
            <StyledBadge
              color="secondary"
              badgeContent={
                singlePost.comments ? singlePost.comments.length : 0
              }
            >
              <Comment onClick={handleComment} style={{ padding: "0 8px" }} />
            </StyledBadge>
          </IconButton>
        </Grid>
        <br />
        <h4>userName</h4>

        <TextField
          label="comment"
          name="comment"
          value={formValues.comment}
          onChange={handleChange}
          size={"small"}
        />
        <Button onClick={handleAddComment}>
          <AddCommentIcon />
        </Button>

        {singlePost.comments && showComment ? (
          singlePost.comments.map((comment) => {
            return (
              <div key={comment.id}>
                <h4>{comment.userName}</h4>
                <h4>{comment.userComment}</h4>
              </div>
            );
          })
        ) : (
          <h3></h3>
        )}
      </Box>
    </>
  );
}

export default Singlepost;
