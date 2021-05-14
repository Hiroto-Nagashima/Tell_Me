import { Story, Meta } from '@storybook/react';
import { ProfileImage } from './ProfileImage';

export default {
  title: 'atoms/ProfileImage',
  component: ProfileImage,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => <ProfileImage {...args} />;

export const Default = Template.bind({});
Default.args = {};
