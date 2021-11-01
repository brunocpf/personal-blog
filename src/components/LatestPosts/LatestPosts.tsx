import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container, Grid } from '@mui/material';
import PostThumbnail from '../PostThumbnail';
import PostMetadata from 'src/data/PostMetadata';

const PREFIX = 'LatestPosts';

const classes = {
  container: `${PREFIX}container`,
};

const StyledBox = styled(Box)(({ theme }) => ({
  [`&.${classes.container}`]: {
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
  return (
    <StyledBox className={classes.container} py={5}>
      <Container>
        <Grid container spacing={5}>
          {posts.map(p => (
            <Grid item xs={12} sm={6} md={4} key={p.slug}>
              <PostThumbnail post={p} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyledBox>
  );
};

export default LatestPosts;
