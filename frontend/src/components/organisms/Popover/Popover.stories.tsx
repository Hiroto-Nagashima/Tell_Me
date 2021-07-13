import { Story, Meta } from '@storybook/react';
import { MyPopover, Props } from './Popover';

export default {
  title: 'Organisms/MyPopover',
  component: MyPopover,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<Props> = (args) => <MyPopover {...args} />;

export const Default = Template.bind({});
Default.args = {
  topText: '08012341234',
  buttonLabel: '山田太郎',
  bottomText: 'hogehoge@gmail.com',
};
