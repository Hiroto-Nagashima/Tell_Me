import { Story, Meta } from '@storybook/react';
import { Props, SelectMenu } from './SelectMenu';

export default {
  title: 'atoms/SelectMenu',
  component: SelectMenu,
  argTypes: {
    variant: {
      control: {
        type: 'radio',
        options: ['text', 'outlined', 'contained'],
      },
    },
    onClick: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<Props> = (args) => <SelectMenu {...args} />;

export const Age = Template.bind({});
Age.args = {
  label: '年齢',
  numbers: [1, 2, 3, 4, 5],
};

export const DaycareId = Template.bind({});
DaycareId.args = {
  label: '保育園のID',
  numbers: [1, 2, 3],
};
