import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { RadioButtonGroup, Props } from './RadioButtonGroup';

export default {
  title: 'Molecules/RadioButtonGroup',
  component: RadioButtonGroup,
  argTypes: {
    onChange: { action: 'clicked' },
    value: {
      options: [0, 1],
      control: { type: 'radio' },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<Props> = (args) => {
  const [value, setValue] = useState(args.value);
  return (
    <RadioButtonGroup
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
  value: 0,
  firstLabel: '私は保護者です',
  secondLabel: '私は先生です',
  firstValue: 0,
  secondValue: 1,
};
