import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { LabeledSelectMenu, Props } from './LabeledSelectMenu';

export default {
  title: 'molecules/LabeledSelectMenu',
  argTypes: {
    onChange: { action: 'onChange' },
  },
  component: LabeledSelectMenu,
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
    <LabeledSelectMenu
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
  numbers: [0,1,2,3],
  mainLabel: "IDを選択してください",
  menuLabel: "保育園のID",
};
