import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container, Grid, Typography } from '@mui/material';
import PostMetadata from 'src/data/PostMetadata';
import LatestPosts from './LatestPosts';
import TagsList from './TagsList';

const PREFIX = 'Blog';

const classes = {
  root: `${PREFIX}root`,
};

const StyledBox = styled(Box)(({ theme }) => ({
  [`&.${classes.root}`]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
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
  return (
    <StyledBox className={classes.root} py={4}>
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
              <Box p={1} bgcolor="background.paper" borderRadius="10px">
                <TagsList tags={tags} currentTag={currentTag} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </StyledBox>
  );
};

export default Blog;
