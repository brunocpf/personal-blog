import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, Switch, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const PREFIX = 'LanguageSwitcher';

const classes = {
  label: `${PREFIX}label`,
};

const StyledTypography = styled(Typography)(({ theme }) => ({
  [`& .${classes.label}`]: {
    verticalAlign: 'sub',
  },
})) as typeof Typography;

export interface LanguageSwitcherProps {}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = () => {
  const { locale, push, pathname, query } = useRouter();
  const isPortuguese = locale?.toLowerCase().includes('pt') ?? false;

  const handleSwitchLanguage = (locale: string) => {
    push({ pathname, query }, { pathname, query }, { locale });
  };

  return (
    <StyledTypography
      component="div"
      color="textPrimary"
      variant="body2"
      align="center"
    >
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>
          <Box
            component="span"
            color={isPortuguese ? 'secondary.main' : 'text.primary'}
            title="Português"
            className={classes.label}
          >
            PT
          </Box>
        </Grid>
        <Grid item>
          <Switch
            checked={!isPortuguese}
            onChange={e => handleSwitchLanguage(e.target.checked ? 'en' : 'pt')}
            color="default"
          />
        </Grid>
        <Grid item>
          <Box
            component="span"
            color={isPortuguese ? 'text.primary' : 'secondary.main'}
            title="English"
            className={classes.label}
          >
            EN
          </Box>
        </Grid>
      </Grid>
    </StyledTypography>
  );
};

export default LanguageSwitcher;
