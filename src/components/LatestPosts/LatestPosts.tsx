import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PostThumbnail from '../PostThumbnail';
import PostMetadata from 'src/data/PostMetadata';

const useStyles = makeStyles(theme => ({
  container: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
}));

export interface LatestPostsProps {
  posts: {
    slug: string;
    data: PostMetadata;
  }[];
}

const LatestPosts: React.FC<LatestPostsProps> = ({ posts }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container} py={5}>
      <Container>
        <Grid container spacing={5}>
          {posts.map(p => (
            <Grid item xs={12} sm={6} md={4} key={p.slug}>
              <PostThumbnail post={p} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LatestPosts;
