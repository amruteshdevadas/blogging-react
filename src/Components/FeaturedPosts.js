import CardActionArea from "@mui/material/CardActionArea";
import "../card.css";
import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Badge } from "@mui/material";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import axios from "axios";
import parse from 'html-react-parser'
function FeaturedPost(props) {
  const { post, editData } = props;  
  const handleDelete = async (e) => {
    console.log("Deleting the post");
     {
      let postId = post._id;
      console.log(postId)
      await axios
        .delete(
          "https://blogging-b251-wd.herokuapp.com/post/deletePost",
          { headers: { authorization: window.localStorage.getItem("token"),id: postId  }}
          
        )
        .then((response) => {
          console.log(response.data);
          window.location.reload()
        })
        .catch((error) => {
          console.log(error);
          
        });
    }
  };
  return (
    <Grid item xs={12} md={6} mb={1}>
      <CardActionArea component="a" href={`/singlePost/${post._id}`}>
        <Paper
          sx={{
            position: "relative",
            backgroundColor: "grey.800",
            color: "#fff",
            mb: 4,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${post.image})`,
          }}
          className="featuredPosts"
        >
          {/* Increase the priority of the hero background image */}
          {
            <img
              style={{ display: "none" }}
              src={post.image}
              alt={post.imageText}
            />
          }
          <Grid container>
            <Box
              sx={{
                height: 150,
                position: "relative",
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {post.createdAt.substring(0, 15)}
              </Typography>
              {/* <Typography variant="subtitle1" paragraph> */}
             
                {parse(post.content.substring(0, 125))}
              {/* </Typography> */}
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </Box>
          </Grid>
        </Paper>
      </CardActionArea>

      {editData ? (
        <>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Badge badgeContent={post.likes.length} color="primary">
              <ThumbUpIcon />
            </Badge>

            <Badge badgeContent={post.comments.length} color="primary">
              <InsertCommentIcon />
            </Badge>

            <Link to={`/editPost/${post._id}`}>
              {" "}
              <ModeEditOutlineIcon />
            </Link>

            <DeleteForeverIcon onClick={handleDelete} />
          </Grid>
        </>
      ) : (
        ""
      )}
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
