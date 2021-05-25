import { Story, Meta } from '@storybook/react';
import { PostCard, Props } from './PostCard';

export default {
  title: 'organisms/PostCard',
  component: PostCard,
} as Meta;

const Template: Story<Props> = (args) => <PostCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  poster: '高橋ひさし',
  content:
    '今日は児童遊園までお散歩に行きました。途中で雨が降ってきたのでみんなと急いで帰りました。みんな泥だらけでになりながら楽しんでいました。',
};
