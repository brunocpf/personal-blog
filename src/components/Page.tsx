import React from 'react';
import Head from 'next/head';

export interface PageProps {
  title?: string;
}

const Page: React.FC<PageProps> = ({
  title = 'This is the default title',
  children,
}) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    {children}
  </>
);

export default Page;
