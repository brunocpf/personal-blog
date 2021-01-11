import React from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import PostThumbnail from '../PostThumbnail';
import PostMetadata from 'src/data/PostMetadata';

const useStyles = makeStyles(theme => ({
  container: {
    ...theme.mixins.gutters(),
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
