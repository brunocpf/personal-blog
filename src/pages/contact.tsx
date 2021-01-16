import { Box, makeStyles, Container, Card } from '@material-ui/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';
import { useIntl } from 'react-intl';
import Markdown from 'src/components/Markdown';
import Page from 'src/components/Page';
import getForLocale from 'src/data/getForLocale';
import makePageTitle from 'src/util/makePageTitle';
import PostMetadata from 'src/data/PostMetadata';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.gutters(),
  },
  list: {
    margin: 0,
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
}));

const Contact: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  content,
}) => {
  const classes = useStyles();
  const { formatMessage } = useIntl();

  return (
    <Page
      title={makePageTitle(
        formatMessage({
          id: 'contact',
        }),
      )}
    >
      <Box flex="1">
        <Box className={classes.root} py={4}>
          <Container>
            <Card className={classes.card}>
              <Box p={2}>
                <Markdown>{content}</Markdown>
              </Box>
            </Card>
          </Container>
        </Box>
      </Box>
    </Page>
  );
};

export const getStaticProps: GetStaticProps<{
  data: PostMetadata;
  content: string;
}> = async ({ locale }) => {
  const { data, content } = await getForLocale(locale ?? 'pt').contact();

  return {
    props: {
      data,
      content,
    },
  };
};

export default Contact;