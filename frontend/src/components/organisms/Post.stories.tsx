import { Story, Meta } from '@storybook/react';
import { Post, Props } from './Post';

export default {
  title: 'organisms/Post',
  component: Post,
} as Meta;

const Template: Story<Props> = (args) => <Post {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'お散歩',
  content: "今日は児童遊園までお散歩に行きました。途中で雨が降ってきたのでみんなと急いで帰りました。みんな泥だらけでになりながら楽しんでいました。"
};
