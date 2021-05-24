import { Story, Meta } from '@storybook/react';
import { PostForm, Props } from './PostForm';

export default {
  title: 'organisms/PostForm',
  component: PostForm,
} as Meta;

const Template: Story<Props> = (args) => <PostForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: `https://d2hmx91pr90hgc.cloudfront.net/uploads/kid/image/3/image.jpeg`,
};
