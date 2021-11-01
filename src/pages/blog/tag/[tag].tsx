import { Box } from '@mui/material';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';
import { useIntl } from 'react-intl';
import Page from 'src/components/Page';
import getForLocale from 'src/data/getForLocale';
import makePageTitle from 'src/util/makePageTitle';
import PostMetadata from 'src/data/PostMetadata';
import Blog from 'src/components/Blog';
import { useRouter } from 'next/router';
import Head from 'next/head';

const BlogPageForTag: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ posts, tags, currentTag }) => {
  const { formatMessage } = useIntl();
  const { isFallback } = useRouter();

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
          {!isFallback && (
            <Blog posts={posts} tags={tags} currentTag={currentTag} />
          )}
        </Box>
      </Page>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const pathsPerLocale = await Promise.all(
    locales?.map(async locale => {
      const tags = await getForLocale(locale).tags();
      return tags.map(t => ({
        params: { tag: t },
        locale,
      }));
    }) ?? [],
  );
  const paths = pathsPerLocale.flat();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  {
    posts: {
      slug: string;
      data: PostMetadata;
    }[];
    tags: string[];
    currentTag?: string;
  },
  {
    tag: string;
  }
> = async ({ locale, params }) => {
  const tag = params?.tag ?? '';
  const repository = getForLocale(locale ?? 'pt');
  const posts = await repository.posts([tag]);
  const tags = await repository.tags();

  return {
    props: {
      posts,
      tags,
      currentTag: tag,
    },
  };
};

export default BlogPageForTag;
