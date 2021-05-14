import { Story, Meta } from '@storybook/react';
import { Footer, Props } from './Footer';

export default {
  title: 'organisms/Footer',
  component: Footer,
} as Meta;

const Template: Story<Props> = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
  telephoneNumberOfDaycare: "080-1234-5678",
  addressOfDaycare: "東京都小平市学園西町1-2-3"
};
