import { Story, Meta } from '@storybook/react';
import { Props, StyledButton } from './StyledButton';
import { Grid } from '@material-ui/core';

export default {
  title: 'atoms/StyledButton',
  component: StyledButton,
  argTypes: {
    variant: {
      control: {
        type: 'radio',
        options: ['text', 'outlined', 'contained'],
      },
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

const Template: Story<Props> = (args) => <StyledButton {...args} />;

export const Logout = Template.bind({});
Logout.args = {
  label: 'Logout',
  variant: 'outlined',
  height: 30,
  fontSize: 15,
  width: 20,
};

export const Login = Template.bind({});
Login.args = {
  label: 'Login',
  variant: 'contained',
  height: 50,
  fontSize: 25,
  width: 20,
  borderRadius: 20,
};
