import React from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import PostMetadata from 'src/data/PostMetadata';
import LatestPosts from './LatestPosts';
import TagsList from './TagsList';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.gutters(),
  },
}));

export interface BlogProps {
  posts: {
    slug: string;
    data: PostMetadata;
  }[];
  tags: string[];
  currentTag?: string;
}

const Blog: React.FC<BlogProps> = ({ posts, tags, currentTag }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root} py={4}>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={10}>
            {currentTag && (
              <Typography variant="h6">{`Tag: #${currentTag}`}</Typography>
            )}
            <LatestPosts posts={posts} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Box py={3}>
              <Box p={1} bgcolor="background.paper" borderRadius={10}>
                <TagsList tags={tags} currentTag={currentTag} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Blog;
