import { Story, Meta } from '@storybook/react';
import { Props, FlexibleButton } from './FlexibleButton';
import { Grid } from '@material-ui/core';

export default {
  title: 'atoms/FlexibleButton',
  component: FlexibleButton,
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

const Template: Story<Props> = (args) => <FlexibleButton {...args} />;



export const ButtonWithGrid3 = (args: Props) => (
  <Grid container>
    <Grid item xs={3}>
      <FlexibleButton variant="contained" color="primary" label="ログイン" />
    </Grid>
  </Grid>
);

export const ButtonWithGrid4 = (args: Props) => (
  <Grid container>
    <Grid item xs={4}>
      <FlexibleButton variant="contained" color="primary" label="ログイン" />
    </Grid>
  </Grid>
);

export const ButtonWithGrid5 = (args: Props) => (
  <Grid container>
    <Grid item xs={5}>
      <FlexibleButton variant="contained" color="primary" label="ログイン" />
    </Grid>
  </Grid>
);

export const ButtonWithGrid6 = (args: Props) => (
  <Grid container>
    <Grid item xs={6}>
      <FlexibleButton variant="contained" color="primary" label="ログイン" />
    </Grid>
  </Grid>
);
