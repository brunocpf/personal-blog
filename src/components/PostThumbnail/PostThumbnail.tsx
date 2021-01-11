import React from 'react';
import {
  Box,
  Card,
  IconButton,
  makeStyles,
  Typography,
  Link as MaterialLink,
} from '@material-ui/core';
import useDateFormatter from 'src/util/useDateFormatter';
import color from 'color';
import { FaEllipsisH } from 'react-icons/fa';
import PostMetadata from 'src/data/PostMetadata';
import Link from 'next/link';
import TagsList from '../TagsList';

const useStyles = makeStyles(theme => ({
  card: {
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
  }),
}));

export interface PostThumbnailProps {
  post: {
    slug: string;
    data: PostMetadata;
  };
}

const PostThumbnail: React.FC<PostThumbnailProps> = ({ post }) => {
  const classes = useStyles(post);
  const format = useDateFormatter();

  return (
    <Card className={classes.card}>
      <Box
        px={1}
        pt={4}
        display="flex"
        justifyContent="space-between"
        className={classes.image}
      >
        <Typography>{format(post.data.date)}</Typography>
        <Typography>Bruno</Typography>
      </Box>
      <Box bgcolor="background.default" p={1}>
        <Box pb={2}>
          <Link
            href={{ pathname: '/blog/[slug]', query: { slug: post.slug } }}
            passHref
          >
            <MaterialLink>
              <Typography variant="h6">{post.data.title}</Typography>
            </MaterialLink>
          </Link>
          <TagsList tags={post.data.tags} />
        </Box>
        <Typography variant="body1">{post.data.summary}</Typography>
        <Box width="100%" display="flex" justifyContent="center">
          <Link
            href={{ pathname: '/blog/[slug]', query: { slug: post.slug } }}
            passHref
          >
            <IconButton>
              <FaEllipsisH />
            </IconButton>
          </Link>
        </Box>
      </Box>
    </Card>
  );
};

export default PostThumbnail;
