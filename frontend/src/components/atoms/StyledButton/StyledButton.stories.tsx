import { Story, Meta } from '@storybook/react';
import { Props, StyledButton } from './StyledButton';
import { Grid } from '@material-ui/core';

export default {
  title: 'atoms/StyledButton',
  component: StyledButton,
  argTypes: {
    color: {
      control: {
        type: 'radio',
        options: ['inherit', 'primary', 'secondary', 'default'],
      },
    },
    variant: {
      control: {
        type: 'radio',
        options: ['text', 'outlined', 'contained'],
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<Props> = (args) => <StyledButton {...args} />;

export const ButtonWithGrid3 = (args: Props) => (
  <Grid container>
    <Grid item xs={3}>
      <StyledButton variant="contained" label="ログイン" />
    </Grid>
  </Grid>
);

export const ButtonWithGrid4 = (args: Props) => (
  <Grid container>
    <Grid item xs={4}>
      <StyledButton variant="contained" label="ログイン" />
    </Grid>
  </Grid>
);

export const ButtonWithGrid5 = (args: Props) => (
  <Grid container>
    <Grid item xs={5}>
      <StyledButton variant="contained" label="ログイン" />
    </Grid>
  </Grid>
);

export const ButtonWithGrid6 = (args: Props) => (
  <Grid container>
    <Grid item xs={6}>
      <StyledButton variant="contained" label="ログイン" />
    </Grid>
  </Grid>
);
