import { Story, Meta } from '@storybook/react';
import { KidProfile } from './KidProfile';

export default {
  title: 'organisms/KidProfile',
  component: KidProfile,
} as Meta;

const Template: Story = (args) => <KidProfile {...args} />;

export const Default = Template.bind({});
Default.args = {};

