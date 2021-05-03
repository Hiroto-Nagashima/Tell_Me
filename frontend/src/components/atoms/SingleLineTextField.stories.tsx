import { Story, Meta } from '@storybook/react';
import { Props, SingleLineTextField } from './SingleLineTextField';
import { Grid } from '@material-ui/core';

export default {
  title: 'atoms/SingleLineTextField',
  component: SingleLineTextField,
} as Meta;

const Template: Story<Props> = (args) => <SingleLineTextField {...args} />;

export const Email = (args: Props) => (
  <Grid container>
    <Grid item xs={6}>
      <SingleLineTextField textName="Email" placeholder="xxxxx@xxx.ne.jp" />
    </Grid>
  </Grid>
);

export const Password = (args: Props) => (
  <Grid container>
    <Grid item xs={6}>
      <SingleLineTextField textName="Password" placeholder="xxxxx" />
    </Grid>
  </Grid>
);

export const BodyTemperature = (args: Props) => (
  <Grid container>
    <Grid item xs={6}>
      <SingleLineTextField textName="体温" placeholder="36.x" />
    </Grid>
  </Grid>
);
