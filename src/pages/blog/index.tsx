import { Box } from '@material-ui/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';
import { useIntl } from 'react-intl';
import Page from 'src/components/Page';
import getForLocale from 'src/data/getForLocale';
import makePageTitle from 'src/util/makePageTitle';
import PostMetadata from 'src/data/PostMetadata';
import Blog from 'src/components/Blog';
import Head from 'next/head';

const BlogPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
  tags,
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
            id: 'blog',
          }),
        )}
      >
        <Box flex="1">
          <Blog posts={posts} tags={tags} />
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
  tags: string[];
}> = async ({ locale }) => {
  const repository = getForLocale(locale ?? 'pt');
  const posts = await repository.posts();
  const tags = await repository.tags();

  return {
    props: {
      posts,
      tags,
    },
  };
};

export default BlogPage;
