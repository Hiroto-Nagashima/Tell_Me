import { Story, Meta } from '@storybook/react';
import { Props, MultipleLinesTextField } from './MultipleLinesTextField';
import { Grid } from '@material-ui/core';

export default {
  title: 'atoms/MultipleLinesTextField',
  component: MultipleLinesTextField,
} as Meta;

const Template: Story<Props> = (args) => <MultipleLinesTextField {...args} />;

export const Memo = (args: Props) => (
  <Grid container>
    <Grid item xs={6}>
      <MultipleLinesTextField label="連絡事項" row={4} variant="standard"/>
    </Grid>
  </Grid>
);

export const Breakfast = (args: Props) => (
  <Grid container>
    <Grid item xs={6}>
      <MultipleLinesTextField label="朝食" row={4} variant="filled"/>
    </Grid>
  </Grid>
);

export const Dinner = (args: Props) => (
  <Grid container>
    <Grid item xs={6}>
      <MultipleLinesTextField label="夕食" row={4} variant="outlined"/>
    </Grid>
  </Grid>
);
