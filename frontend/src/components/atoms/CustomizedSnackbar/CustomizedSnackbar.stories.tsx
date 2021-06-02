import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { Props, CustomizedSnackbar } from './CustomizedSnackbar';
import { StyledButton } from '../StyledButton/StyledButton';

export default {
  title: 'atoms/Snackbar',
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

export const ActualMovement: Story = () => {
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
      <StyledButton variant="contained" onClick={handleClick} label="ボタン" />
      <CustomizedSnackbar onClose={handleClose} open={open} severity="error">
        エラーです
      </CustomizedSnackbar>
    </>
  );
};

export const Error = Template.bind({});
Error.args = {
  severity: 'error',
  open: true,
  children: 'エラーです',
};

export const Warning = Template.bind({});
Warning.args = {
  severity: 'warning',
  open: true,
  children: '注意です',
};

export const Info = Template.bind({});
Info.args = {
  severity: 'info',
  open: true,
  children: 'これはペンです',
};

export const Success = Template.bind({});
Success.args = {
  severity: 'success',
  open: true,
  children: '成功です！！',
};
