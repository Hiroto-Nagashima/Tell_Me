import { Story, Meta } from '@storybook/react';
import { AlignedTextFields, Props } from './AlignedTextFields';

export default {
  title: 'molecules/AlignedTextFields',
  argTypes: {
    onChangeLeftValue: { action: 'onChange' },
    onChangeRightValue: { action: 'onChange' },
  },
  component: AlignedTextFields,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em', width: '35%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<Props> = (args) => <AlignedTextFields {...args} />;

export const Default = Template.bind({});
Default.args = {
  mainLabel: '名前を入力してください',
  leftLabel: '姓',
  rightLabel: '名',
  leftPlaceholder: '山田',
  rightPlaceholder: '太郎',
};
