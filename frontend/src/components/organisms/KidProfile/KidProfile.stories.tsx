import { Story, Meta } from '@storybook/react';
import { KidProfile, Props } from './KidProfile';

export default {
  title: 'organisms/KidProfile',
  component: KidProfile,
} as Meta;

const Template: Story<Props> = (args) => <KidProfile {...args} />;

export const Default = Template.bind({});
Default.args = {
  age: 1,
  kidName: '鈴木健斗',
  favoritePlay: 'おままごと',
  favoriteFood: 'カレー、焼肉',
};
