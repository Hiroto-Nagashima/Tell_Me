import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Props, CustomizedSnackbar } from './CustomizedSnackbar';

export default {
  title: 'atoms/Alert',
  component: CustomizedSnackbar,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<Props> = (args) => <CustomizedSnackbar {...args} />;

export const Error = (args: Props) => (
  <>
    <CustomizedSnackbar {...args} />
  </>
);

export const Warning = (args: Props) => (
  <>
    <CustomizedSnackbar {...args} />
  </>
);

export const Info = (args: Props) => (
  <>
    <CustomizedSnackbar {...args} />
  </>
);

export const Success = (args: Props) => (
  <>
    <CustomizedSnackbar {...args} />
  </>
);

