import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { LabeledRadioButtonGroup, Props } from './LabeledRadioButtonGroup';

export default {
  title: 'molecules/LabeledRadioButtonGroup',
  argTypes: {
    onChange: { action: 'onChange' },
  },
  component: LabeledRadioButtonGroup,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em', width: '35%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<Props> = (args) => {
  const [value, setValue] = useState(0);
  return (
    <LabeledRadioButtonGroup
      {...args}
      onChange={(e) => {
        args.onChange(e);
        setValue(Number(e.target.value));
      }}
      value={value}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  mainLabel: '性別を選択してください',
  component: 'h3',
  firstLabel: '男',
  secondLabel: '女',
  firstValue: 0,
  secondValue: 1,
};
