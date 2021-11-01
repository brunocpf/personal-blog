import React from 'react';
import {
  Box,
  Card,
  IconButton,
  Typography,
  Link as MaterialLink,
} from '@mui/material';
import useDateFormatter from 'src/util/useDateFormatter';
import color from 'color';
import { FaEllipsisH } from 'react-icons/fa';
import PostMetadata from 'src/data/PostMetadata';
import Link from 'next/link';
import TagsList from '../TagsList';
import { useIntl } from 'react-intl';

export interface PostThumbnailProps {
  post: {
    slug: string;
    data: PostMetadata;
  };
}

const PostThumbnail: React.FC<PostThumbnailProps> = ({ post }) => {
  const format = useDateFormatter();
  const { formatMessage } = useIntl();

  return (
    <Card
      sx={{
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
        px={1}
        pt={4}
        display="flex"
        justifyContent="space-between"
        sx={{
          backgroundImage: theme =>
            post.data.image
              ? `linear-gradient(0deg, ${
                  theme.palette.background.paper
                }, ${color(theme.palette.background.paper)
                  .alpha(0.4)
                  .toString()}), url(${post.data.image})`
              : '',
          backgroundSize: 'cover',
        }}
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
            <MaterialLink underline="hover">
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
            <IconButton
              aria-label={formatMessage({
                id: 'seeMore',
              })}
              size="large"
            >
              <FaEllipsisH />
            </IconButton>
          </Link>
        </Box>
      </Box>
    </Card>
  );
};

export default PostThumbnail;
