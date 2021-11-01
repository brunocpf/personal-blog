import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Link as MaterialLink } from '@mui/material';
import Link from 'next/link';
import classNames from 'classnames';

const PREFIX = 'TagsList';

const classes = {
  link: `${PREFIX}link`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.link}`]: {
    fontWeight: 'bold',
  },
}));

export interface TagsListProps {
  tags: string[];
  currentTag?: string;
}

const TagsList: React.FC<TagsListProps> = ({ tags, currentTag }) => {
  return (
    <Root>
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
              underline="hover"
            >{`#${t}`}</MaterialLink>
          </Link>
        </Box>
      ))}
    </Root>
  );
};

export default TagsList;
