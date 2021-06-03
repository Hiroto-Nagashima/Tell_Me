import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider } from '@material-ui/core/styles';
import React from 'react';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const withThemeProvider = (Story, context) => {
  return (
    <StylesProvider injectFirst>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Story {...context} />
    </StylesProvider>
  );
};
export const decorators = [withThemeProvider];
