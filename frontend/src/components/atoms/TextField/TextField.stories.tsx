import { Story, Meta } from '@storybook/react';
import { Props, TextField } from './TextField';
import { Grid } from '@material-ui/core';

export default {
  title: 'atoms/TextField',
  component: TextField,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em', width: '30%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<Props> = (args) => <TextField {...args} />;

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
