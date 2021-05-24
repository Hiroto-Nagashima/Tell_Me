import { Story, Meta } from '@storybook/react';
import { TeacherProfile, Props } from './TeacherProfile';

export default {
  title: 'organisms/TeacherProfile',
  component: TeacherProfile,
} as Meta;

const Template: Story<Props> = (args) => <TeacherProfile {...args} />;

export const Default = Template.bind({});
Default.args = {
  daycareName: '東京保育園',
  lastName: '高橋',
  firstName: '先生',
  selfIntroduction: 'こんにちは！！子供が大好きでこの仕事をはじめました。去年まで埼玉の保育園で働いていました。趣味は釣りと山登りです。よろしくお願いします！！',
};
