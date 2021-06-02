import { Story, Meta } from '@storybook/react';
import { ParentPopover, Props } from './ParentPopover';

export default {
  title: 'Molecules/ParentPopover',
  component: ParentPopover,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<Props> = (args) => <ParentPopover {...args} />;

export const Default = Template.bind({});
Default.args = {
  buttonLabel: '山田太郎',
  email: 'hogehoge@gmail.com',
  telephoneNumber: '08012341234',
};
