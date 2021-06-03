import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { InputOfNotebook, Props } from './InputOfNotebook';

export default {
  title: 'organisms/InputOfNotebook',
  component: InputOfNotebook,
  argTypes: {
    onClickRegister: { action: 'onClick' },
    onChangeMemo: { action: 'onChange' },
    onChangeDinner: { action: 'onChange' },
    onChangeBreakfast: { action: 'onChange' },
    onChangeHasBathed: { action: 'onChange' },
    onChangeBodyTemperature: { action: 'onChange' },
    hasBathed: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} as Meta;

const Template: Story<Props> = (args) => {
  const [memo, setMemo] = useState<string | null>(args.memo);
  const [hasBathed, setHasBathed] = useState<boolean | null>(args.hasBathed);
  const [dinner, setDinner] = useState<string | null>(args.dinner);
  const [breakfast, setBreakfast] = useState<string | null>(args.breakfast)
  const [bodyTemperature, setBodyTemperature] = useState<number | null>(args.bodyTemperature);
  return (
    <InputOfNotebook
      {...args}
      onChangeBodyTemperature={(e) => {
        args.onChangeBodyTemperature(e);
        setBodyTemperature(Number(e.target.value));
      }}
      onChangeMemo={(e) => {
        args.onChangeMemo(e);
        setMemo(e.target.value);
      }}
      onChangeDinner={(e) => {
        args.onChangeDinner(e);
        setDinner(e.target.value);
      }}
      onChangeBreakfast={(e) => {
        args.onChangeBreakfast(e);
        setBreakfast(e.target.value);
      }}
      onChangeHasBathed={(e) => {
        args.onChangeHasBathed(e);
        setHasBathed(!hasBathed);
      }}
      memo={memo}
      dinner={dinner}
      breakfast={breakfast}
      hasBathed={hasBathed}
      bodyTemperature={bodyTemperature}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  selectedDate: "2021/06/15",
  hasBathed: true
};
