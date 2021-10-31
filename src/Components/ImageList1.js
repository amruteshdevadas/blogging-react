import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { CardActionArea } from '@mui/material';

export default function TitlebarImageList(props) {

    const{post} = props

  return (
    <ImageList sx={{ width: 500, height: 450 }}>
      {post.map((item) => {

         return(
            <CardActionArea href={`/singlePost/${item._id}`}>
            <ImageListItem key={item._id}>
              <img
                src={`${item.image}?w=248&fit=crop&auto=format`}
                srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${item.title}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
            </CardActionArea>
         )

        })}
    </ImageList>
  );
}

