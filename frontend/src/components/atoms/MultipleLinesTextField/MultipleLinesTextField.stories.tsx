import { Story, Meta } from '@storybook/react';
import { Props, MultipleLinesTextField } from './MultipleLinesTextField';
import { Grid } from '@material-ui/core';

export default {
  title: 'atoms/MultipleLinesTextField',
  component: MultipleLinesTextField,
} as Meta;

const Template: Story<Props> = (args) => <MultipleLinesTextField {...args} />;

export const Memo = Template.bind({});
Memo.args = {
  label: '連絡',
  row: 4,
  variant: 'outlined',
};

export const Dinner = Template.bind({});
Dinner.args = {
  label: '夕食',
  row: 4,
  variant: 'outlined',
};

export const Breakfast = Template.bind({});
Breakfast.args = {
  label: '朝食',
  row: 4,
  variant: 'outlined',
};

export const Post = Template.bind({});
Post.args = {
  label: '投稿',
  row: 4,
  variant: 'standard',
};
