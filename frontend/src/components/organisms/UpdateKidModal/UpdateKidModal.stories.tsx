import { Story, Meta } from '@storybook/react';
import { Props, UpdateKidModal } from './UpdateKidModal';

export default {
  title: 'organisms/UpdateKidModal',
  component: UpdateKidModal,
} as Meta;

const Template: Story<Props> = (args) => <UpdateKidModal {...args} />;

export const Default = Template.bind({});
Default.args = {};
