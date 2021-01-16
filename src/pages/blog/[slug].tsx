import { Box } from '@material-ui/core';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';
import { useIntl } from 'react-intl';
import Page from 'src/components/Page';
import getForLocale from 'src/data/getForLocale';
import makePageTitle from 'src/util/makePageTitle';
import PostMetadata from 'src/data/PostMetadata';
import { useRouter } from 'next/router';
import Post from 'src/components/Post';

const BlogPost: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
  slug,
}) => {
  const { formatMessage } = useIntl();
  const { isFallback } = useRouter();

  return (
    <Page
      title={makePageTitle(
        formatMessage({
          id: 'blog',
        }),
      )}
    >
      <Box flex="1">{!isFallback && <Post postData={post} />}</Box>
    </Page>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const pathsPerLocale = await Promise.all(
    locales?.map(async locale => {
      const slugs = await getForLocale(locale).slugs();
      return slugs.map(s => ({
        params: { slug: s },
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
    slug: string;
    post: {
      data: PostMetadata;
      content: string;
    };
  },
  {
    slug: string;
  }
> = async ({ locale, params }) => {
  const slug = params?.slug ?? '';
  const repository = getForLocale(locale ?? 'pt');
  const post = await repository.post(slug);

  return {
    props: {
      slug,
      post,
    },
  };
};

export default BlogPost;
