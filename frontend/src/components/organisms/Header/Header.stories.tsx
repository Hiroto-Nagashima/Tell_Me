import { Story, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Header, Props } from './Header';

export default {
  title: 'organisms/Header',
  component: Header,
} as Meta;

const Template: Story<Props> = (args) => {
  return (
    <BrowserRouter>
      <Header {...args} />
    </BrowserRouter>
  );
};
export const LoggedIn = Template.bind({});
LoggedIn.args = {
  title: 'Tell Me',
};
