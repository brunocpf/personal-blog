import { Box } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import Hero from 'src/components/Hero';
import Page from 'src/components/Page';
import makePageTitle from 'src/util/makePageTitle';

const Home: React.FC = () => {
  const { formatMessage } = useIntl();

  return (
    <Page
      title={makePageTitle(
        formatMessage({
          id: 'home',
        }),
      )}
    >
      <Box flex="1" bgcolor="background.paper">
        <Hero />
      </Box>
    </Page>
  );
};

export default Home;
