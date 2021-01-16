import React from 'react';
import {
  Box,
  Card,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import PostMetadata from 'src/data/PostMetadata';
import Markdown from './Markdown';
import useDateFormatter from 'src/util/useDateFormatter';
import TagsList from './TagsList';
import color from 'color';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.gutters(),
  },
  card: {
    background: theme.palette.background.default,
    boxShadow:
      theme.palette.type === 'dark'
        ? 'none'
        : `0px 0px 20px 10px rgb(0 0 0 / 12%)`,
    border:
      theme.palette.type === 'dark'
        ? `1px solid ${theme.palette.background.paper}`
        : 'none',
  },
  image: ({ data }: { data: { image?: string } }) => ({
    backgroundImage: data.image
      ? `linear-gradient(0deg, ${theme.palette.background.paper}, ${color(
          theme.palette.background.paper,
        )
          .alpha(0.4)
          .toString()}), url(${data.image})`
      : '',
    backgroundSize: 'cover',
    backgroundColor: theme.palette.background.paper,
  }),
}));

export interface PostProps {
  postData: {
    data: PostMetadata;
    content: string;
  };
}

const Post: React.FC<PostProps> = ({ postData }) => {
  const { content, data } = postData;
  const format = useDateFormatter();

  const classes = useStyles(postData);
  return (
    <Box className={classes.root} py={4}>
      <Container>
        <Card className={classes.card}>
          <Box
            px={2}
            pt={8}
            className={classes.image}
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
