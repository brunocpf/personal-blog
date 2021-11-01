import React from 'react';
import { styled } from '@mui/material/styles';
import ReactMarkdown, { MarkdownToJSX } from 'markdown-to-jsx';
import { Typography, TypographyProps } from '@mui/material';
import { Link } from '@mui/material';

const PREFIX = 'Markdown';

const classes = {
  listItem: `${PREFIX}listItem`,
};

const StyledReactMarkdown = styled(ReactMarkdown)(({ theme }) => ({
  [`& .${classes.listItem}`]: {
    marginTop: theme.spacing(1),
  },
}));

const ListItem: React.FC<TypographyProps> = props => {
  return (
    <li className={classes.listItem}>
      <Typography component="span" {...props} />
    </li>
  );
};

const options: MarkdownToJSX.Options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h5',
      },
    },
    h2: { component: Typography, props: { gutterBottom: true, variant: 'h6' } },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: 'subtitle1' },
    },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: 'caption', paragraph: true },
    },
    p: { component: Typography, props: { paragraph: true } },
    a: { component: Link },
    li: { component: ListItem },
  },
};

const Markdown: React.FC<{
  [key: string]: any;
  children: string;
  options?: MarkdownToJSX.Options;
}> = props => {
  return <StyledReactMarkdown options={options} {...props} />;
};

export default Markdown;
