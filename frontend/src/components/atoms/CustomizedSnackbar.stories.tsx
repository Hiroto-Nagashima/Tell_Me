import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { Props, CustomizedSnackbar } from './CustomizedSnackbar';
import { DefaultButton } from './DefaultButton';

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

export const Error: Story = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <DefaultButton variant="contained" color="primary" onClick={handleClick}>
        ボタン
      </DefaultButton>
      <CustomizedSnackbar onClose={handleClose} open={open} severity="error">
        エラーです
      </CustomizedSnackbar>
    </>
  );
};

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
