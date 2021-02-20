import { Box } from '@material-ui/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import React from 'react';
import { useIntl } from 'react-intl';
import Hero from 'src/components/Hero';
import LatestPosts from 'src/components/LatestPosts';
import Page from 'src/components/Page';
import getForLocale from 'src/data/getForLocale';
import PostMetadata from 'src/data/PostMetadata';
import makePageTitle from 'src/util/makePageTitle';

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
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
            id: 'home',
          }),
        )}
      >
        <Box flex="1">
          <Hero />
          <LatestPosts posts={posts} />
        </Box>
      </Page>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  posts: {
    slug: string;
    data: PostMetadata;
  }[];
}> = async ({ locale }) => {
  const repository = getForLocale(locale ?? 'pt');
  const posts = await repository.latestPosts();

  return {
    props: {
      posts,
    },
  };
};

export default Home;
