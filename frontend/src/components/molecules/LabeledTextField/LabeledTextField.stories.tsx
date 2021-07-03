import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { LabeledTextField, Props } from './LabeledTextField';

export default {
  title: 'molecules/LabeledTextField',
  argTypes: {
    onChange: { action: 'onChange' },
  },
  component: LabeledTextField,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em', width: '35%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<Props> = (args) => {
  const [value, setValue] = useState('');
  return (
    <LabeledTextField
      {...args}
      onChange={(e) => {
        args.onChange(e);
        setValue(e.target.value);
      }}
      value={value}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  row: 2,
  mainLabel: '好きな遊びを入力してください',
  inputLabel: '好きな遊び',
  placeholder: 'おままごと',
  multiline: true,
};
