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

export const Empty: Story<Props> = (args) => <CustomizedSnackbar {...args} />;

export const Error: Story<Props> = (args: Props) => (
  <>
    <CustomizedSnackbar {...args} />
  </>
);

export const Warning: Story<Props> = (args: Props) => (
  <>
    <CustomizedSnackbar {...args} />
  </>
);

export const Info: Story<Props> = (args: Props) => (
  <>
    <CustomizedSnackbar {...args} />
  </>
);

export const Success: Story<Props> = (args: Props) => (
  <>
    <CustomizedSnackbar {...args} />
  </>
);
