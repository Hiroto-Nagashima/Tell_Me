import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { ReactComponent as Logo } from '../../images/undraw_page_not_found_su7k.svg';

export const Page404: React.FC = () => {
  return (
    <Box p={10}>
      <Typography variant="h2" align="center">
        Not Found
      </Typography>
      <Box textAlign="center">
        <Logo />
      </Box>
    </Box>
  );
};
