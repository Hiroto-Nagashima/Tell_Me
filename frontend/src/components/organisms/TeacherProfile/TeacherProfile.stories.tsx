import { Story, Meta } from '@storybook/react';
import { TeacherProfile, Props } from './TeacherProfile';

export default {
  title: 'organisms/TeacherProfile',
  component: TeacherProfile,
} as Meta;

const Template: Story<Props> = (args) => <TeacherProfile {...args} />;

export const Default = Template.bind({});
Default.args = {
  age: 1,
  lastName: '鈴木',
  firstName: '健斗',
  favoritePlay: 'おままごと',
  favoriteFood: 'カレー、焼肉',
};
