import { Box, Container, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';
import { useIntl } from 'react-intl';
import Markdown from 'src/components/Markdown';
import Page from 'src/components/Page';
import getForLocale from 'src/data/getForLocale';
import makePageTitle from 'src/util/makePageTitle';
import PostMetadata from 'src/data/PostMetadata';
import Head from 'next/head';

const PREFIX = 'About';

const classes = {
  root: `${PREFIX}root`,
  list: `${PREFIX}list`,
  card: `${PREFIX}card`,
};

const Root = styled(Box)(({ theme }) => ({
  [`& .${classes.root}`]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },

  [`& .${classes.list}`]: {
    margin: 0,
  },

  [`& .${classes.card}`]: {
    background: theme.palette.background.default,
    boxShadow:
      theme.palette.mode === 'dark'
        ? 'none'
        : `0px 0px 20px 10px rgb(0 0 0 / 12%)`,
    border:
      theme.palette.mode === 'dark'
        ? `1px solid ${theme.palette.background.paper}`
        : 'none',
  },
}));

const About: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  content,
}) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Head>
        <meta
          name="description"
          content={formatMessage({
            id: 'metaDescription',
          })}
        />
      </Head>
      <Page
        title={makePageTitle(
          formatMessage({
            id: 'about',
          }),
        )}
      >
        <Root flex="1">
          <Box className={classes.root} py={4}>
            <Container>
              <Card className={classes.card}>
                <Box p={2}>
                  <Markdown>{content}</Markdown>
                </Box>
              </Card>
            </Container>
          </Box>
        </Root>
      </Page>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  data: PostMetadata;
  content: string;
}> = async ({ locale }) => {
  const { data, content } = await getForLocale(locale ?? 'pt').aboutMe();

  return {
    props: {
      data,
      content,
    },
  };
};

export default About;
