import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { CardActionArea } from "@mui/material";

export default function TitlebarBelowMasonryImageList(props) {
  const { post } = props;
  return (
    <ImageList sx={{ width: 500, height: 450 }}>
      {post ? (
        post.map((item) => {
          return (
            <>
              <CardActionArea href={`/singlePost/${item._id}`}>
                <ImageListItem key={item._id}>
                  <img
                    width={100}
                    height={100}
                    src={item.image}
                    srcSet={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    position="below"
                    title={item.title}
                    subtitle={<span>by: {item.author}</span>}
                  />
                </ImageListItem>
              </CardActionArea>
            </>
          );
        })
      ) : (
        <h6>No posts yet</h6>
      )}
    </ImageList>
  );
}

