import React from 'react';
import { Box, Card, Container, Typography } from '@mui/material';
import PostMetadata from 'src/data/PostMetadata';
import Markdown from './Markdown';
import useDateFormatter from 'src/util/useDateFormatter';
import TagsList from './TagsList';
import color from 'color';

export interface PostProps {
  postData: {
    data: PostMetadata;
    content: string;
  };
}

const Post: React.FC<PostProps> = ({ postData }) => {
  const { content, data } = postData;
  const format = useDateFormatter();

  return (
    <Box px={{ xs: 2, md: 3 }} py={4}>
      <Container>
        <Card
          sx={{
            background: theme => theme.palette.background.default,
            boxShadow: theme =>
              theme.palette.mode === 'dark'
                ? 'none'
                : `0px 0px 20px 10px rgb(0 0 0 / 12%)`,
            border: theme =>
              theme.palette.mode === 'dark'
                ? `1px solid ${theme.palette.background.paper}`
                : 'none',
          }}
        >
          <Box
            px={2}
            pt={8}
            sx={{
              backgroundImage: theme =>
                data.image
                  ? `linear-gradient(0deg, ${
                      theme.palette.background.paper
                    }, ${color(theme.palette.background.paper)
                      .alpha(0.4)
                      .toString()}), url(${data.image})`
                  : '',
              backgroundSize: 'cover',
              backgroundColor: theme => theme.palette.background.paper,
            }}
            display="flex"
            justifyContent="space-between"
          >
            <Typography>{format(data.date)}</Typography>
            <Typography>Bruno</Typography>
          </Box>
          <Box p={2}>
            <Markdown>{content}</Markdown>
          </Box>
          <Box px={2} py={2} bgcolor="background.paper">
            <TagsList tags={data.tags} />
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Post;
