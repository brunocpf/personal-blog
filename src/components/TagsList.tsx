import React from 'react';
import { Box, Link as MaterialLink, makeStyles } from '@material-ui/core';
import Link from 'next/link';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
  link: {
    fontWeight: 'bold',
  },
}));

export interface TagsListProps {
  tags: string[];
  currentTag?: string;
}

const TagsList: React.FC<TagsListProps> = ({ tags, currentTag }) => {
  const classes = useStyles();

  return (
    <>
      {tags.map(t => (
        <Box component="span" marginRight={1} key={t}>
          <Link
            href={{
              pathname: '/blog/tag/[tag]',
              query: { tag: t },
            }}
            passHref
          >
            <MaterialLink
              className={classNames({
                [classes.link]: t === currentTag,
              })}
            >{`#${t}`}</MaterialLink>
          </Link>
        </Box>
      ))}
    </>
  );
};

export default TagsList;
